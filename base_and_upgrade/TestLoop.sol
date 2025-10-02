// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestLoop {
    function loop() public pure returns (uint256) {
        uint256 sum = 0;
        uint256 i = 0;
        for (;;) {
            if (i >= 10) {
                break;
            }
            sum += i;
            i++;
        }
        return sum;
    }

    function loop2() public pure returns (uint256) {
        uint256 sum = 0;
        uint256 i = 0;
        while (i < 10) {
            sum += i;
            i++;
        }
        return sum;
    }

    function loop3() public pure returns (uint256) {
        uint256 sum = 0;
        uint256 i = 0;
        do {
            sum += i;
            i++;
        } while (i < 10);
        return sum;
    }
}
