// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// VulnerableVault.sol
contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // function withdraw() external {
    //     require(balances[msg.sender] > 0, "No balance");

    //     // 发送 ETH（外部调用，容易被攻击者重入）
    //     (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
    //     require(success, "Transfer failed");

    //     // 更新余额（放在调用后，导致漏洞）
    //     balances[msg.sender] = 0;
    // }

    function withdraw() external {
        require(balances[msg.sender] > 0, "No balance");
        uint256 amount = balances[msg.sender]; // 先读取余额
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}

contract Attacker {
    VulnerableVault public target;

    constructor(address _target) {
        target = VulnerableVault(_target);
    }

    // 回调函数，趁机再次提取
    receive() external payable {
        // if (address(target).balance > 1 ether) {
        //     target.withdraw();
        // }
    }

    function attack() external payable {
        // require(msg.value >= 1 ether, "Need 1 ETH");
        target.deposit{value: 1 ether}();
        target.withdraw();
    }

    function sendMyAccount() public payable {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "send failed");
    }
}
