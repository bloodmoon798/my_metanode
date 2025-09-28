// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Caller {
    function testMsg() public view returns (address) {
        return msg.sender;
    }

    function testTx() public view returns (address) {
        return tx.origin;
    }
}

contract Callee {
    // 0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B
    // 0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B
    Caller caller;

    constructor() {
        caller = new Caller();
    }

    function testMsg() public view returns (address) {
        return caller.testMsg();
    }

    function testTx() public view returns (address) {
        return caller.testTx();
    }
}
