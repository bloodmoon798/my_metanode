// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract TestInt {
//     function add(uint8 x, uint16 y) public pure returns (uint256) {
//         return x + y;
//     }

//     function devide(uint8 x, uint8 y) public pure returns (uint256) {
//         return x / y;
//     }

//     function modulo(uint8 x, uint8 y) public pure returns (uint256) {
//         return x % y;
//     }

//     function exponentiation(uint8 x, uint8 y) public pure returns (uint256) {
//         return x**y;
//     }

//     // 3 -> 0000 0011 左位移1位 0000 0110 -> 输出6, 左位移2位 0000 1100 -> 12
//     // x左移y位 = x * 2 ** y
//     function leftShift(uint8 x, uint8 y) public pure returns (uint256) {
//         return x << y;
//     }

//     // x右移y位 = x / 2 ** y
//     function rightShift(uint8 x, uint8 y) public pure returns (uint256) {
//         return x >> y;
//     }

//     // 按位与(除非两个1返回1，否则返回0)
//     // 0000 1100 => 12
//     // 0000 0101 => 5
//     // 0000 0100 => 4
//     function and(uint8 x, uint8 y) public pure returns (uint256) {
//         return x & y;
//     }

//     // 按位或(除非两个0返回0，否则返回1)
//     // 0000 1100 => 12
//     // 0000 0101 => 5
//     // 0000 1101 => 13
//     function or(uint8 x, uint8 y) public pure returns (uint256) {
//         return x | y;
//     }

//     // 异或(上下相同返回0，不相同返回1)
//     // 0000 1100 => 12
//     // 0000 0101 => 5
//     // 0000 1001 => 9
//     function xor(uint8 x, uint8 y) public pure returns (uint256) {
//         return x ^ y;
//     }
// }
