// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestMessageInfo {
    function getMessageDetails() public payable returns (address, uint256) {
        return (msg.sender, msg.value);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getGasLeft() public view returns (uint256) {
        return gasleft();
    }

    function getBlockChainId() public view returns (uint256) {
        return block.chainid;
    }
}
