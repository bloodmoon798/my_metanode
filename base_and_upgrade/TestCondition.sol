// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestCondition {
    // 简单错误（不带参数）
    error Unauthorized();

    // 带参数的错误
    error InsufficientBalance(uint256 available, uint256 required);

    // 复杂参数的错误
    error TransferFailed(
        address from,
        address to,
        uint256 amount,
        string reason
    );

    function requireError(bool condition) public pure returns (uint256) {
        require(condition, "Input is not true");
        return 1;
    }

    function assertError(bool condition) public pure returns (uint256) {
        assert(condition);
        return 2;
    }

    function revertError(bool condition) public pure returns (uint256) {
        if (!condition) revert Unauthorized();
        return 3;
    }

    function revertError2(bool condition) public pure returns (uint256) {
        if (!condition) revert("revert::: some reason");
        return 3;
    }

    function revertError3(bool condition) public view returns (uint256) {
        if (!condition)
            revert TransferFailed(
                msg.sender,
                tx.origin,
                888,
                "amount is not enough"
            );
        return 3;
    }
}

contract TryCatchContract {
    TestCondition public testCondition;

    constructor() {
        testCondition = new TestCondition();
    }

    function tyrcatch(bool condition) public view returns (string memory) {
        try testCondition.revertError2(condition) returns (uint256) {
            // 调用成功时执行的代码
            // 可以使用返回值 result
            return "success";
        } catch Error(string memory reason) {
            // 当 revert(reasonString) 或 require(false, reasonString) 被调用时
            // 可以访问 reason
            return string.concat("reason:::", reason);
        } catch Panic(uint256) {
            // 当发生 panic 错误时（如除以零、数组越界等）
            // errorCode 表示错误类型
            return "panic";
        } catch (bytes memory lowLevelData) {
            // 当错误不符合上述任何类型时
            // 包含低级错误数据
            return string.concat("lowLevelData::: ", string(lowLevelData));
        }
    }
}

contract Owner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    // 自定义修饰符，仅允许合约所有者调用
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }
}
