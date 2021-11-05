// SPDX-License-Identifier: MIT

/*

 An ERC721 contract that creates NFTs. The mint function requires a payment of ERC20 tokens in order tokens
 mint the NFT. This is an example of something you can do with a unique currency you create.
 
*/

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IERC20 { // defining an interface of the (external) token contract that you're going to be interacting with
    function decimals() external view returns (uint8);
    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool);
    function balanceOf(address _account) external view returns (uint256);
    function approve(address _spender, uint256 _amount) external returns (bool);
}

contract MyERC721 is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    address erc20Address = 0xF247971B3E60be4256BE719A5C59A1298DC26686; // swap out this address with the address of your deployed ERC20 token contract
    IERC20 tokenContract = IERC20(erc20Address); // the token contract address
    
    // Number of ERC20 tokens needed to mint an NFT
    uint256 PRICE = 10;

    constructor() ERC721("NFT + ERC20", "MYNFT") {}
    
    function safeMint(address to) public onlyOwner {

        
        // this contract must be approved to spend your ERC20 tokens before minting
        
        // reverts if the transfer wasn't successful
        require(tokenContract.transferFrom(msg.sender, address(this), PRICE), 'Could not transfer tokens from your address to this contract'); 
        
        // transfer was successful, rest of your code
        
        _safeMint(to, _tokenIdCounter.current()); // mint the NFT to the 'to' address that was passed in,
                                                  // with the current tokenId that's been kept track of by _tokenIdCounter
        _tokenIdCounter.increment();    // increment _tokenIdCounter by 1 (so the next NFT's ID will be 1 higher)
    }
    
}