/*
  SPDX-License-Identifier: UNLICENSED
  Contract created by Douglas Rosman for Blockchain: The New Internet
  Code assistance from this YouTube Tutorial:
  Create ERC20 token on Ethereum (the EASY way) - EatTheBlocks
  https://www.youtube.com/watch?v=ZLFiGHIxS1c
  
  //////////// DESCRIPTION ////////////
  This is contract allows you to deploy your own cryptocurrency on the
  Ethereum Blockchain in the form of an ERC20 token. This contract extends
  the ERC20 template contract from OpenZeppelin –
  (https://github.com/OpenZeppelin/openzeppelin-contracts)
  
  More information about ERC20 tokens:
  https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
  
  //////////// INSTRUCTIONS ////////////
  Before deploying your contract...
  1. Change the file name from 'MyToken.sol' to 'WhateverYourTokenNameIs.sol'
  2. Change the name of your contract to match your file name.
  3. Change the following parameters of your token:
    3-1. Token name
    3-2. Token symbol
    3-3. Token amount
    3-4. Number of decimals
    3-5. Whether or not your token has a fixed supply
*/

pragma solidity ^0.8.0;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract HappyCoin is ERC20 {
    
    string private myTokenName = 'Happy Coin'; // 1. The name of your of your Token
    string private myTokenSymbol = 'HAP'; // 2. A 3-letter symbol, like a stock symbol
    uint256 private myAmount = 2000; // 3. The amount of tokens you want to create*
    uint8 private myNumDecimals = 0; // 4. The number of decimal places, 0-18 (The ERC20 default is 18)
    // bool private isFixedSupply = false; // 5. set to 'true' if you don't want to mint more of this token in the future
    
    
    // address public admin;
    
    constructor() ERC20(myTokenName, myTokenSymbol) {
        _mint(msg.sender, myAmount * 10 ** decimals());
        _transfer(msg.sender, address(this), 1000);
        // admin = msg.sender;
        
    }
    
    function decimals() public view override returns (uint8) {
        return myNumDecimals;
    }
    
    function reward(uint amt) external {
        uint256 contractBalance = balanceOf(address(this));
        require(amt > 0, "No reward??");
        require(amt <= contractBalance, "Not enough tokens in the reserve");
        _transfer(address(this), msg.sender, amt);
        // require(!isFixedSupply, 'fixed supply, cannot mint more');
        // require(msg.sender == admin, 'only admin can mint');
    }
    
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
    
}