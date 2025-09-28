// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Application Binary Interface 应用二进制接口
contract TestABI {
    function encodeData(string memory text, uint256 number)
        public
        pure
        returns (bytes memory, bytes memory)
    {
        return (
            // 0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000036d73780000000000000000000000000000000000000000000000000000000000
            abi.encode(text, number),
            // 0x6d73780000000000000000000000000000000000000000000000000000000000000012
            abi.encodePacked(text, number)
        );
    }

    function decodeData(bytes memory encodedData)
        public
        pure
        returns (string memory text, uint256 number)
    {
        return (abi.decode(encodedData, (string, uint256)));
    }

    // 获取当前函数签名
    function getSelector() public pure returns (bytes4) {
        return msg.sig;
    }

    // 计算函数选择器
    function computeSecletor(string memory func) public pure returns (bytes4) {
        return bytes4(keccak256(bytes(func)));
    }

    // 0x4745b6cd0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc40000000000000000000000000000000000000000000000000000000000000064
    function trasfer(address addr, uint256 amount)
        public
        pure
        returns (bytes memory)
    {
        return msg.data;
    }

    // 调用函数生成msg.data
    // 0x4745b6cd0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc40000000000000000000000000000000000000000000000000000000000000064
    function encodeFunctionCall() public pure returns (bytes memory) {
        return
            abi.encodeWithSignature(
                "trasfer(address,uint256)",
                0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
                100
            );
    }

    // 哈希运算
    function hashFunctions(string memory input)
        public
        pure
        returns (
            bytes32,
            bytes32,
            bytes32
        )
    {
        bytes memory data = abi.encodePacked(input);
        return (keccak256(data), sha256(data), ripemd160(data));
    }

    // 数学运算(addmod(x, y, m) => (x + y) % m, mulmod(x, y, m) => (x * y) % m)，避免溢出
    function modularMath(
        uint256 x,
        uint256 y,
        uint256 m
    )
        public
        pure
        returns (
            uint256 normalPlusAndModulo,
            uint256 funcPlusAndModulo,
            uint256 normalMultiAndModulo,
            uint256 funcMultiAndModulo
        )
    {
        return ((x + y) % m, addmod(x, y, m), (x * y) % m, mulmod(x, y, m));
    }

    // 椭圆曲线恢复公钥(ecrecover)
    function recoverAddress(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        return (ecrecover(hash, v, r, s));
    }

    // 随机数生成
    function getRandomNumber() public view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) %
            100;
    }
}
