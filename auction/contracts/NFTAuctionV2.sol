// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFTAuctionV2 is Initializable {
    struct Auction {
        // 卖家
        address seller;
        // 拍卖截止时间
        uint256 duration;
        // 起拍价
        uint256 startPrice;
        // 是否结束
        bool ended;
        // 最高出价者
        address highestBidder;
        // 最高价
        uint256 highestBid;
        // 开始时间
        uint256 startTime;
        // nft合约地址
        address nftAddress;
        // nft tokenId
        uint256 tokenId;
    }

    // 状态变量
    mapping(uint256 => Auction) public auctions;
    // 下一个拍卖ID
    uint256 public nextAuctionId;
    // 管理员地址
    address public admin;

    function initialize() public initializer {
        admin = msg.sender;
    }

    function createAuction(
        uint256 _duration,
        uint256 _startPrice,
        address _nftAddress,
        uint256 _tokenId
    ) external {
        // 只有管理员可以创建拍卖
        require(msg.sender == admin, "only admin can create auction");
        // 检查参数是否规范
        require(
            _duration > 1000 * 60,
            "duration must be greater than 1 minute"
        );
        require(_startPrice > 0, "start price must be greater than 0");
        // 创建拍卖
        auctions[nextAuctionId] = Auction({
            seller: msg.sender,
            duration: _duration,
            startPrice: _startPrice,
            ended: false,
            highestBidder: address(0),
            highestBid: 0,
            startTime: block.timestamp,
            nftAddress: _nftAddress,
            tokenId: _tokenId
        });
        nextAuctionId++;
    }

    // 买家参与买单
    function placeBid(uint256 _auctionId) external payable {
        Auction storage auction = auctions[_auctionId];
        // 检查拍卖是否结束
        require(
            !auction.ended &&
                auction.startTime + auction.duration > block.timestamp,
            "auction has ended"
        );
        // 检查出价是否大于当前最高价
        require(
            msg.value > auction.highestBid && msg.value >= auction.startPrice,
            "bid must be higher than current highest bid and start price"
        );
        // 如果有最高出价者，退还之前的最高出价
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }
        // 更新最高出价者和最高价
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    function testHello() public pure returns (string memory) {
        return "Hello World!";
    }
}
