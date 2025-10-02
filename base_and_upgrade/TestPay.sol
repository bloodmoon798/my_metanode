// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    event CallLog(bytes input, bytes output);

    receive() external payable {}

    function testTransfer() external {
        payable(msg.sender).transfer(1 ether);
    }

    function testSend() external {
        bool success = payable(msg.sender).send(1 ether);
        require(success, "Send failed");
    }

    function testCall(bytes memory input) external {
        (bool success, bytes memory data) = payable(msg.sender).call{
            value: 1 ether
        }(input);
        require(success, "Call failed");
        emit CallLog(input, data);
    }
}

contract BankUser {
    Bank bank;

    constructor(address payable _bank) {
        bank = Bank(_bank);
    }

    receive() external payable {}

    function testTransfer() external {
        bank.testTransfer();
    }

    function testSend() external {
        bank.testSend();
    }

    function testCall(bytes memory input) external {
        bank.testCall(abi.encodePacked(input));
    }

    function testPay() external payable returns(address){
        return 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    }
}
