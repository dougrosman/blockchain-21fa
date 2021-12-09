////// ETHEREUM SETUP //////
ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// swap this address out with the contract address for your token (found in Remix after deploying)
const contractAddress = "0xd3aa4347580354A6b69E820C7dECF33af018DAe6"; // swap out with your address
const contractABI = [
    "function balanceOf(address account) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function tokenByIndex(uint256 index) public view returns (uint256)",
    "function mintPhoto(address from, address to, uint256 tokenId) public",
    "function tokenURI(uint256 tokenId) public view returns (string)"
  ];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);

// when you want to reward somebody with tokens, call this function:
// tokenWithSigner.mint(numTokens);

////// END ETHEREUM SETUP

$('#reward-button').click(function(){

  tokenWithSigner.mint(numTokens);
})
