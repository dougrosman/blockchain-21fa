////// ETHEREUM SETUP //////
ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0xfAce5F2dE849ded4d3bA85bCEaf504608CDB7132";
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
  "function reward(uint256 amt) public payable"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);

let classifier;
let imageModelURL = 'model/tm-my-image-model/model.json';
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/NyrwjUGle/'

let video;
let flippedVideo;
let label = "";
let meterHeight = 0;
let drawBackground = false;
let patriotConfirmed = false;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.parent("#sketch");
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  if(drawBackground){
    background(0);
  }
  
  // Draw the video
  image(flippedVideo, 0, 0);

  fill(255, 0, 0);
  noStroke();
  rect(width-20, height-meterHeight, 20, meterHeight);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  drawBackground = true;
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  
  /////////////// CLASSIFICATION INFORMATION ////////////////
  // this is the section where you'll initiate a transaction
  // based on the results from the model classification

  if(!patriotConfirmed) {
    if(results[0].label=="Happy" && results[0].confidence > 0.7) {
      
      meterHeight+=2;
      if(meterHeight >= height) {
        meterHeight = height;
        $("#reward-message").show();
        // let tx = tokenWithSigner.reward(10);
        tokenWithSigner.reward(10);
        patriotConfirmed = true;

      }
    } else {
        if(meterHeight > 0) {
          // meterHeight--;
        }
      }
    }
  
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}