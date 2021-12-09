////// ETHEREUM SETUP //////
ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// swap this address out with the contract address for your token (found in Remix after deploying)
const contractAddress = "0x9aee9F65A89abde08767540c19588d6D963fc353"; // swap out with your address
const contractABI = [
    "function balanceOf(address account) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function tokenByIndex(uint256 index) public view returns (uint256)",
    "function mintPhoto(string tokenURI) public",
    "function tokenURI(uint256 tokenId) public view returns (string)"
  ];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);

// when you want to reward somebody with tokens, call this function:
// tokenWithSigner.mint(numTokens);

////// END ETHEREUM SETUP

$('.gallery img').click(function() {

  const imgFilePath = $(this)[0].src
  const imgFilePathSplit = imgFilePath.split("/");
  const imgFileName = imgFilePathSplit[imgFilePathSplit.length-1];

  console.log(imgFilePath);
  console.log(imgFileName);

  tokenWithSigner.mintPhoto(imgFilePath);
})

// $('#reward-button').click(function(){

//   tokenWithSigner.mint(numTokens);
// })
