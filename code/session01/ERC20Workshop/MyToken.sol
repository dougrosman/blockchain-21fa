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

contract MyToken is ERC20 {
    
    string private myTokenName = 'My Token'; // 1. The name of your of your Token
    string private myTokenSymbol = 'MYT'; // 2. A 3-letter symbol, like a stock symbol
    uint256 private myAmount = 100; // 3. The amount of tokens you want to create*
    uint8 private myNumDecimals = 2; // 4. The number of decimal places, 0-18 (The ERC20 default is 18)
    bool private isFixedSupply = false; // 5. set to 'true' if you don't want to mint more of this token in the future
    
    
    address public admin;
    
    constructor() ERC20(myTokenName, myTokenSymbol) {
        _mint(msg.sender, myAmount * 10 ** decimals()) ;     
        admin = msg.sender;
    }
    
    function decimals() public view override returns (uint8) {
        return myNumDecimals;
    }
    
    function mint(address to, uint amount) external {
        require(!isFixedSupply, 'fixed supply, cannot mint more');
        require(msg.sender == admin, 'only admin can mint');
        _mint(to, amount);
    }
    
    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
    
}

// *Fun fact: The Maximum amount of ERC20 tokens you could possibly make:
//
// 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,935
//
// The "amount" property of an ERC20 token uses a uint256 data type to store the number.
// A uint256 can store a number up to 2^256 - 1. That evaluates to approximately 1.15792 * 10^77
// Written out, that number looks like this:
// 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,935
//
// This isn't quite the maximum potential amount of an ERC20 token;
// that maximum depends on how many decimal places your token uses.
// For example, if your token uses the default maximum of 18 decimal places,
// Your maximum total supply of your ERC20 token would be:
//
// (2^256-1)/10^18
//
// or,
//
// 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457.584007913129639935,
// which we'll round down to:
// 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457
//
//
// So there you have it. If you for some reason felt the need to create the absolute maximum amount of
// ERC20 tokens possible, you could set myTotalAmount to:
// 115792089237316195423570985008687907853269984665640564039457
// (and still be able to divide a single one of those tokens up to 18 decimal places)
// Note: if you set your decimals to be a value less than 18, you can find your maximum amount like this:
// (2^256-1)/10^(myNumDecimals)
//
// Source: https://ethereum.stackexchange.com/questions/25228/max-possible-erc20-tokens-allowed-with-18-decimals