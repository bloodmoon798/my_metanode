// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestMapping {
    mapping(address account => uint balance) public myMapping;
    function setMyMapping(address _key, uint _value) public {
        myMapping[_key] = _value;
    }

    // 嵌套
    mapping(address account => mapping(string currency => uint256 balance)) public userBalances;
    function setUserBalance(string memory currency, uint256 amount) public {
        userBalances[msg.sender][currency] = amount;
    }
    function getUserBalance(address account, string memory currency) public view returns (uint256) {
        return userBalances[account][currency];
    }
    function deleteUserBalance(address account, string memory currency) public {
        delete userBalances[account][currency];
    }
}