// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/* A simple contract to create a basic ERC20 with a totaly supply of 1000 tokens. We will
use tokens created by this contract to pay for the minting of an NFT in a separate smart contract */

contract MyERC20 is ERC20 {
    constructor() ERC20("MyERC20", "MERC") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}