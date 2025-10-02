// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestWithdrawMoney {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withDrawMoney() external {
        require(msg.sender == owner, "not owner");
        (bool success, ) = payable(owner).call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }
}
