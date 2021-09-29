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

// change 'HappyCoin' to the name of your contract
contract HappyCoin is ERC20 {
    
    string private myTokenName = 'Happy Coin'; // 1. The name of your of your Token
    string private myTokenSymbol = 'HAP'; // 2. A 3-letter symbol, like a stock symbol
    uint256 private myAmount = 1000; // 3. The amount of tokens you want to create
    uint8 private myNumDecimals = 18; // 4. The number of decimal places, 0-18 (The ERC20 default is 18)
    bool private isFixedSupply = false; // 5. set to 'true' if you don't want to mint more of this token in the future
    address public admin;
    
    constructor() ERC20(myTokenName, myTokenSymbol) {

        uint256 totalSupply = myAmount * 10 ** decimals();


        // how many tokens you want to send to this contract
        uint256 amountForContract = totalSupply/2;
        // (it must be less than or equal to the amount you mint (totalSupply))
        // by default, totalSupply/2 means that half of the tokens you mint will be sent to the contract
        

        admin = msg.sender;
        _mint(msg.sender, totalSupply);
        
        // ensures that you don't send more tokens to the contract than are available in your wallet
        require(amountForContract <= totalSupply);
        _transfer(msg.sender, address(this), amountForContract);
    }
    
    function decimals() public view override returns (uint8) {
        return myNumDecimals;
    }
    
    // this function rewards participants by sending tokens directly from this contract
    // this is the function we call in our main.js file on our website
    function reward(uint256 amt) external {
        uint256 contractBalance = balanceOf(address(this));
        require(amt > 0, "No reward??");
        require(amt <= contractBalance, "Not enough tokens in the reserve");
        require(!isFixedSupply, 'fixed supply, cannot mint more');
        require(msg.sender == admin, 'only admin can mint');
        _transfer(address(this), msg.sender, amt);
    }

    // this function allows the original creator of this contract to
    // mint more tokens and increase the supply
    function mint(address to, uint256 amount) external {
        require(!isFixedSupply, 'fixed supply, cannot mint more');
        require(msg.sender == admin, 'only admin can mint');
        _mint(to, amount);
    }
}