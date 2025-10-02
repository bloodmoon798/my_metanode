const { ethers, upgrades } = require("hardhat");
const path = require("path");
const fs = require("fs");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { save } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deployer address:", deployer);
  // 读取 .cache/proxyNftAuction.json 文件
  const storePath = path.resolve(__dirname, "./.cache/proxyNftAuction.json");
  const data = fs.readFileSync(storePath, "utf-8");
  const { proxyAddress, implementationAddress, abi } = JSON.parse(data);

  // 升级版的合约
  const NFTAuctionV2 = await ethers.getContractFactory("NFTAuctionV2");

  // 升级代理合约
  const nftAuctionV2Proxy = await upgrades.upgradeProxy(
    proxyAddress,
    NFTAuctionV2,
    { call: "admin" }
  );
  await nftAuctionV2Proxy.waitForDeployment();
  const proxyAddressV2 = await nftAuctionV2Proxy.getAddress();

  //   // 保存代理合约地址
  //   fs.writeFileSync(
  //     storePath,
  //     JSON.stringify({
  //       proxyAddress: proxyAddressV2,
  //       implementationAddress: implementationAddress,
  //       abi: abi,
  //     })
  //   );

  await save("NFTAuctionV2Proxy", {
    address: proxyAddressV2,
    abi,
  });
};
module.exports.tags = ["all", "upgradeNFTAuction"];
