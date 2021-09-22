// SPDX-License-Identifier: GPL-3.0
// You can upload this contract to Remix in order to deploy it

pragma solidity >= 0.7.0 < 0.9.0;

// The contract name should match the filename
contract IsArt {

    // A variable to store the status of the contract as art or not art
    // When the contract is deployed, it begins life not as not art 
    bool isArt = false;
    
    // A function to change the status of the contract's artfulness
    // This function writes to blockchain, and therefore requires a small gas fee
    function changeStatus() public {
        if(isArt) {
            isArt = false;
        } else {
            isArt = true;
        }
    }
    
    // A function to view the status of the contract's artfulness
    function viewStatus() public view returns (string memory){
        if(isArt) {
            return "This contract is art";
        } else {
            return "This contract is not art";
        }
    }
}