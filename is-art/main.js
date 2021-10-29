ethereum.autoRefreshOnNetworkChange = false;
ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner(); // the person signed into metamask is the 'signer'


// \/ \/ \/ \/ CHANGE THIS EACH TIME YOU DEPLOY A NEW CONTRACT \/ \/ \/ \/

// Insert your contract address here.
const contractAddress = "0x89ec369cBdD2B16a136cd0d6f4Cc33b984f184b9"; 

// /\ /\ /\ /\ CHANGE THIS EACH TIME YOU DEPLOY A NEW CONTRACT /\ /\ /\ /\


const contractABI = [
  "function changeStatus() public",
  "function viewStatus() public view returns (string memory)"
];

// we use the 'contract' variable when we need to read from the blockchain
const contract = new ethers.Contract(contractAddress, contractABI, provider);


// we use the 'tokenWithSigner' variable when we need to do a transaction that
// involves spending ETH (e.g. sending ETH, sending tokens, writing to a contract)
const tokenWithSigner = contract.connect(signer);


// executes the status change upon clicking the button
$('.change-status').click(changeStatus)

// reads and displays the contract's art status directly from the blockchain
viewStatus();

// an asynchrononous function to view the art status of the contract
async function viewStatus() {
  
  // view the art status of the contract on the blockchain
  let status = await contract.viewStatus();

  if(status == "This contract is art") {
    $('.is-art').css('color', 'rgb(29, 168, 94)'); 
  } else {
    $('.is-art').css('color', 'rgb(189, 62, 34)');
  }

  // update the HTML to display the status
  $('.is-art').text(`${status}`);

  
}

// Change the status of the contract between "is not art" and "is art"

// You will need to pay a small gas fee to change the status.
function changeStatus() {
    tokenWithSigner.changeStatus();
}

// a not so elegant but totally functional way to automatically
// update the displayed status of the contract after changing it
// every 2 seconds, check the blockchain to see if the status has changed
setInterval(function(){
    viewStatus();
}, 2000);

$('.info-link').click(function(){
  $('.info').toggle();
})