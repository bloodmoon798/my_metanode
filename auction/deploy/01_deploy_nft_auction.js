const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const path = require("path");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { save } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deployer address:", deployer);

  const NFTAuction = await ethers.getContractFactory("NFTAuction");

  // 通过代理合约部署
  const nftAuctionProxy = await upgrades.deployProxy(NFTAuction, [], {
    initializer: "initialize",
  });

  await nftAuctionProxy.waitForDeployment();

  const proxyAddress = await nftAuctionProxy.getAddress();
  console.log("代理合约地址:", proxyAddress);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log("实现合约地址:", implementationAddress);

  const storePath = path.resolve(__dirname, "./.cache/proxyNftAuction.json");

  fs.writeFileSync(
    storePath,
    JSON.stringify({
      proxyAddress,
      implementationAddress,
      abi: NFTAuction.interface.format("json"),
    })
  );

  await save("NFTAuctionProxy", {
    address: proxyAddress,
    abi: NFTAuction.interface.format("json"),
    // args: [],
    // log: true,
  });
};
module.exports.tags = ["all", "deployNFTAuction"];
