// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestArr {
    uint256 public a = 10;

    uint256[] public arr;

    uint256[] public arr2 = [1, 2, 3];

    uint256[] public arr3 = new uint256[](5);

    function readArr()
        external
        view
        returns (uint256[] memory data, uint256 len)
    {
        data = arr;
        len = arr.length;
    }

    function readArr2()
        external
        view
        returns (uint256[] memory data, uint256 len)
    {
        data = arr2;
        len = arr2.length;
    }

    function readArr3()
        external
        view
        returns (uint256[] memory data, uint256 len)
    {
        data = arr3;
        len = arr3.length;
    }

    uint256[3] public staticArr;

    uint256[6] public staticArr2 = [1, 2, 3];

    function readStaticArr()
        external
        view
        returns (uint256[3] memory data, uint256 len)
    {
        data = staticArr;
        len = staticArr.length;
    }

    function readStaticArr2()
        external
        view
        returns (uint256[6] memory data, uint256 len)
    {
        data = staticArr2;
        len = staticArr2.length;
    }

    // 多维数组
    uint256[2][3] public multiArray = [[1, 2], [3, 4], [5, 6]];
    uint256 public element = multiArray[0][1];

    bytes public bs = "abc\x22\x22";
    bytes public _data = new bytes(10);

    function readBytesByIndex(uint256 i) public view returns (bytes1) {
        return bs[i];
    }

    function readBytesIndexByByte1(bytes1 d) public view returns (int256) {
        for (uint256 i = 0; i < bs.length; i++) {
            if (bs[i] == d) {
                return int256(i);
            }
        }
        return -1;
    }

    string public str0;
    string public str1 = "TinyXiong\u718A";

    function readStringByIndex(uint256 i) public view returns (string memory) {
        // solidity不支持直接通过索引读取字符串，1. 可以通过api转bytes再计算；2. 用openZeppelin的StringUtils
        // return str1[i];
    }

    function testSlice(
        bytes calldata data,
        uint256 start,
        uint256 end
    ) public pure returns (bytes memory) {
        return data[start:end];
    }
}
