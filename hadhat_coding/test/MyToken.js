const hre = require("hardhat");
const { expect } = require("chai");

describe("MyToken Test", async function () {
  const { ethers } = hre;
  const initialSupply = 10000;
  let MyTokenContract;
  let account1, account2;

  beforeEach(async () => {
    [account1, account2] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    MyTokenContract = await MyToken.connect(account2).deploy(initialSupply);
    await MyTokenContract.waitForDeployment();
    const contractAddress = await MyTokenContract.getAddress();
    expect(contractAddress).to.length.greaterThan(0);
    console.log("合约地址:", contractAddress);
  });

  it("验证合约name, symbol, decimal", async function () {
    expect(await MyTokenContract.name()).to.equal("MyToken");
    expect(await MyTokenContract.symbol()).to.equal("MTK");
    expect(await MyTokenContract.decimals()).to.equal(18);
  });

  it("测试转账", async function () {
    // const balanceOfAccount1 = await MyTokenContract.balanceOf(account1);
    // expect(balanceOfAccount1).to.equal(initialSupply);

    const resp = await MyTokenContract.transfer(account1, initialSupply / 2);
    console.log(resp);

    const balanceOfAccount2 = await MyTokenContract.balanceOf(account2);
    expect(balanceOfAccount2).to.equal(initialSupply / 2);
  });
});
