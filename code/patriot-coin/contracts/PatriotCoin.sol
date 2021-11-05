// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract PatriotCoin is ERC20 {
    
    string private myTokenName = 'Patriot Coin';
    string private myTokenSymbol = 'USA';
    bool private isFixedSupply = false;
    uint256 private totalSupply = 1776;
    uint8 private numDecimals = 0;
    
    constructor() ERC20(myTokenName, myTokenSymbol) {
        _mint(msg.sender, totalSupply * 10 ** decimals());
        _transfer(msg.sender, address(this), 1000);
    }
    
    function decimals() public view override returns (uint8) {
        return numDecimals;
    }
  
    function reward(address to, uint amount) external {
        require(!isFixedSupply, 'fixed supply, cannot mint more');
        require(msg.sender == admin, 'only admin can mint');
        _mint(to, amount);
    }
    
    // this pays out directly from the contract
    function reward(uint256 amt) public {
        uint256 contractBalance = balanceOf(address(this));
        require(amt > 0, "No reward??");
        require(amt <= contractBalance, "Not enough tokens in the reserve");
        _transfer(address(this), msg.sender, amt);
    }
}

