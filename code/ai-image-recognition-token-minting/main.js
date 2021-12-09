// SET THESE VARIABLES TO CUSTOMIZE YOUR INTERACTION
const CONFIDENCE = 0.95; // raise this number if you pass the test too easily;
                          // lower this number if it's too difficult to pass
                          // the number should be between 0-1

const LABEL = "Happy"; // change this label to match the label you created
                        // for your machine learning model in Teachable Machine
                        // (if you're not sure what your label should be, open the file
                        // called "metadata.json" inside your 'model' folder. Scroll until
                        // you see the "labels" property, and insert whichever label you're
                        // going for into this LABEL variable. Make sure your label here is
                        // identical to the label in the metadata.json file)

const BAR_INCREASE_RATE = 2; // the higher this number, the faster the red bar will GROW
                              // if you are "passing the test". higher number == more forgiving

const BAR_DECREASE_RATE = 1; // the higher this number, the faster the red bar will DROP
                              // if you are NOT "passing the test". higher number == more brutal

const REWARD_AMOUNT = 10; // the number of tokens you receive (must be more than 0)
                          // this variable automatically accounts for the number of decimal
                          // places your token supports.


////// ETHEREUM SETUP //////
ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// swap this address out with the contract address for your token (found in Remix after deploying)
const contractAddress = "0xd3aa4347580354A6b69E820C7dECF33af018DAe6";
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
  "function mint(uint256 amount) external"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);

// when you want to reward somebody with tokens, call this function:
// tokenWithSigner.mint(numTokens);

////// END ETHEREUM SETUP

let classifier;
let imageModelURL = 'model/tm-my-image-model/model.json';

let video;
let flippedVideo;
let label = "";
let meterHeight = 0;
let drawBackground = false;
let passedTest = false;

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

  flippedVideo = ml5.flipImage(video);

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

  // draw the red bar to the right of the video that rises/falls based on
  // how well you "pass the test" for the machine learning algorithm
  rect(width-20, height-meterHeight, 20, meterHeight);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

async function gotResult(error, results) {
  drawBackground = true;
  let decimals = await contract.decimals();
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  
  /////////////// CLASSIFICATION INFORMATION ////////////////
  // this is the section where you'll initiate a transaction
  // based on the results from the model classification
  // basically, if you "pass the test" of your machine learning model,
  // you send yourself tokens

  
  let tokenName = await contract.name();

  if(!passedTest) {
    if(results[0].label==LABEL && results[0].confidence > CONFIDENCE) {
      
      meterHeight+= BAR_INCREASE_RATE;
      if(meterHeight >= height) {
        meterHeight = height;
        
        // sets the reward amount to account for the number of decimal places
        // your ERC20 token supports
        let rewardAmount = BigInt(REWARD_AMOUNT * Math.pow(10, decimals));
        tokenWithSigner.reward(rewardAmount);
        
        $("#reward-amount").text(`${REWARD_AMOUNT}`);
        $("#token-name").text(`${tokenName}`);
        $("#reward-message").show();

        passedTest = true;
      }
    } else {
        if(meterHeight > 0) {
          meterHeight-=BAR_DECREASE_RATE;
        }
      }
    }
  
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

$('#reset').click(function(){
  passedTest = false;
  meterHeight = 0;
})