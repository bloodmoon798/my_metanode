// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestGlobalVariables {
    function test() public {
        // msg.data
        // tx.origin
        // block.blockhash(blockNumber);
    }

    function getBlockDetails() public view returns (uint256, uint256) {
        return (block.number, block.timestamp);
    }
}
