// Goal: Implement a basic NFT that allows ownership of a 24-bit color

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ColorToken is ERC721 {
    constructor() public ERC721("ColorToken", "COLR") {}
    function awardItem(address player, uint256 tokenId) public returns (uint256){
        uint256 newItemId = tokenId;
        _mint(player, newItemId);
        return newItemId;
    }
}



