const { ethers, deployments, upgrades } = require("hardhat");
const { expect } = require("chai");

describe("Test upgrade", async function () {
  it("Should be abled to deploy", async function () {
    // 部署业务合约
    await deployments.fixture(["deployNFTAuction"]);

    const nftAuctionProxy = await deployments.get("NFTAuctionProxy");

    const nftAuction = await ethers.getContractAt(
      "NFTAuction",
      nftAuctionProxy.address
    );
    // 调用 createAuction 方法创建拍卖

    await nftAuction.createAuction(
      100 * 1000,
      ethers.parseEther("0.01"),
      ethers.ZeroAddress,
      1
    );

    const auction = await nftAuction.auctions(0);
    console.log("创建拍卖成功::", auction);

    const implementationAddress1 =
      await upgrades.erc1967.getImplementationAddress(nftAuctionProxy.address);
    console.log("升级前实现合约地址:", implementationAddress1);
    // 升级合约
    await deployments.fixture(["upgradeNFTAuction"]);

    const implementationAddress2 =
      await upgrades.erc1967.getImplementationAddress(nftAuctionProxy.address);
    console.log("升级后实现合约地址:", implementationAddress2);

    // 读取合约的 auction[0]
    const auction2 = await nftAuction.auctions(0);
    console.log("升级合约后读取拍卖::", auction2);

    const nftAuctionV2 = await ethers.getContractAt(
      "NFTAuctionV2",
      nftAuctionProxy.address
    );
    const hello = await nftAuctionV2.testHello();
    console.log("调用新方法 testHello::", hello);

    expect(auction2.startTime).to.equal(auction.startTime);

    expect(implementationAddress1).to.not.equal(implementationAddress2);
  });
});
