// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestEvent {
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed receiver, uint256 amount);

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }
}
