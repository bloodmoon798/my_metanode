// // SPDX-License-Identifier: MIT
// pragma solidity ~0.8.0;

// contract TestOverflow {
//     // 255 => 1111 1111
//     // 255 + 1 => 1 | 0000 0000 => 0
//     function add1() public pure returns (uint8) {
//         unchecked {
//             uint8 x = 128;
//             uint8 y = x * 2;
//             return y; // 0
//         }
//     }

//     // 240 => 1111 0000
//     // 16 => 0001 0000
//     // 256 => 1 0000 0000 => uint 截取后8位 => 0000 0000 => 0
//     function add2() public pure returns (uint8) {
//         unchecked {
//             uint8 i = 240;
//             uint8 j = 16;
//             uint8 k = i + j;
//             return k;
//         }
//     }

//     // 1 => 0000 0001
//     // 2 => 0000 0010
//     // 1 - 2 => 1111 1111 => 255
//     function sub1() public pure returns (uint8) {
//         unchecked {
//             uint8 m = 1;
//             uint8 n = m - 2;
//             return n;
//         }
//     }
// }
