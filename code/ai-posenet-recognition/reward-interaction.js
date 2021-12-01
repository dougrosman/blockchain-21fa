////////////////////////////////////////
//           ETHEREUM SETUP           //
////////////////////////////////////////

ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// swap this address out with the contract address for your token (found in Remix after deploying)
const contractAddress = "0x290a027cC8A22746d020AB07CC8d7fa2aA194c9d";
const contractABI = [
  "function name() public view returns (string memory)",
  "function symbol() public view returns (string memory)",
  "function decimals() public view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address recipient, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
  "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
  "function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool)",
  "function reward(uint256 amt) public payable",
  "function mint(address to, uint256 amount) external"
];


const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);

///////////////////////////////////////////////////////////////////////





////////////////////////////////////////
//           POSENET SETUP            //
////////////////////////////////////////

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
const URL = "./model/my-pose-model/";
let model, webcam, ctx, labelContainer, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam

  const width = 320;
  const height = 180;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(width, height, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) { // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  
  await predict();
  
  window.requestAnimationFrame(loop);
}


let winningCounter = 0;
let winningLabel = "";
let shouldMint = true;



async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model

  let winningProbability = 0;
  let currentLabel = "";
  let nextWinningLabel = "";
  const prediction = await model.predict(posenetOutput);
  
  for (let i = 0; i < maxPredictions; i++) {
    
    // store current class name and probability
    currentLabel = prediction[i].className;
    const currentProbability = prediction[i].probability.toFixed(4);
    
    // finds the highest probability among the different classes
    if (currentProbability > winningProbability) {
      winningProbability = currentProbability;
      nextWinningLabel = currentLabel;
    }
    //const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    // labelContainer.childNodes[i].innerHTML = classPrediction;
  }

  // keeps track of how long the winning label has been predicted
  if(winningLabel == nextWinningLabel) {
    winningCounter++;
  } else {
    winningCounter = 0;
    winningLabel = nextWinningLabel;
  }
  $('#pose-meter').css('background', `rgb(0, ${winningCounter*5}, 0)`).css('transform', `scaleX(${winningCounter*4})`);


  console.log("winningLabel: ", winningLabel);
  console.log("winningCounter: ", winningCounter);


  // SEND TRANSACTIONS DEPENDING ON WHICH POSE IS HELD THE LONGEST

  const HOLD_THRESHOLD = 30; // how many times in a row a pose must be predicted in order to call it the winner (roughly 5 predictions are made per second)

  let REWARD_AMOUNT = 1; // how many tokens you want to reward
  
  // REWARD_AMOUNT = BigInt(REWARD_AMOUNT * Math.pow(0, decimals));
  
  if(winningCounter > HOLD_THRESHOLD && shouldMint) {
    
    if(winningLabel == "pose 1") {
      console.log("pose 1 is the winner");
      tokenWithSigner.reward(REWARD_AMOUNT); // reward tokens
    } else if (winningLabel == "pose 2") {
      console.log("pose 2 is the winner");
      tokenWithSigner.reward(REWARD_AMOUNT * 2); // reward tokens
    } else if (winningLabel == "pose 3") {
      console.log("pose 3 is the winner");
      tokenWithSigner.reward(REWARD_AMOUNT * 3); // reward tokens
    } else {
      console.log("resting is the winner");
    }

    shouldMint = false;
  }

  // finally draw the poses (comment this out if you don't want to draw the skeleton)
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}