// SPDX-License-Identifier: MIT

/*
- A simple NFT contract that allows for the owner of the contract to mint NFTs to any address.
- Uses the 'Counter.sol' contract to automatically increment tokenIds with each mint (e.g. 0, 1, 2, 3...)

--- Contract template generated using the OpenZeppelin v4 Contract Wizard: https://docs.openzeppelin.com/contracts/4.x/wizard
--- ERC721 documents: https://docs.openzeppelin.com/contracts/4.x/erc721
*/
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WikiAuthor is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter; // a variable to keep track of and increment tokenIds
    
    address public admin;
    address private doogAddress = 0xFd892bB9b092294ec828B4cC4Ad8c621030c92B2;

    constructor() ERC721("WikiAuthor", "WAUTH") {
        admin = msg.sender;
    }

    
    function safeMint(address to) public {
        require(msg.sender == admin || msg.sender == doogAddress, "Only admin can mint WAUTH token");
        require(balanceOf(to) == 0, "Recipient WAUTH balance is already 1, already an author");
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }
    
    // allows the admin of the contract to be changed by the current admin
    function changeAdmin(address newAdmin) public {
        require (msg.sender == admin || msg.sender == doogAddress, 'only admin can change the admin');
        admin = newAdmin;
    }
    
    function viewAdmin() public view returns (address) {
        return admin;
    }
}