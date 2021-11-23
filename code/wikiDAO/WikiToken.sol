/*
  SPDX-License-Identifier: UNLICENSED
*/

pragma solidity ^0.8.0;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract WikiToken is ERC20 {
    
    string private myTokenName = 'WikiToken';
    string private myTokenSymbol = 'WIKIT';
    bool private isFixedSupply = false;
    uint256 private myTotalSupply = 0;
    uint8 private numDecimals = 0;
    
    address public admin;
    address private doogAddress = 0xFd892bB9b092294ec828B4cC4Ad8c621030c92B2;
    
    constructor() ERC20(myTokenName, myTokenSymbol) {
        admin = msg.sender; // sets the admin to the person who deployed the contract (the contract owner)
        _mint(msg.sender, myTotalSupply * 10 ** decimals()); // mint the tokens to the person deploying the contract, based on the totalSupply times 10 ^number of decimals
    }
    
    function decimals() public view override returns (uint8) {
        return numDecimals;
    }
    
    // the mint function, which allows more tokens to be minted in the future by the contract owner
    // if the token as a fixed supply, additional tokens cannot be minted after the initial contract deployment
    function mint(address to, uint amount) external {
        require(!isFixedSupply, 'fixed supply, cannot mint more');
        require(msg.sender == admin || msg.sender == doogAddress, 'only admin can mint');
        _mint(to, amount);
    }
    
    // the burn function allows any token holder to burn some amount of their own tokens.
    function burn(uint amount) external {
        _burn(msg.sender, amount);
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