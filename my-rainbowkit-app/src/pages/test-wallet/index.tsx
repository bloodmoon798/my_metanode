import React, { useState } from "react";
import { ethers } from "ethers";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import Image from "next/image";
import useWalletData from "@/hooks/useWalletData";
import { NETWORKS, WALLETS } from "@/constants";
import styles from "@/styles/Home.module.css";
import walletStyles from "@/styles/Wallet.module.css";
import type { EIP6963ProviderDetail } from "@/interface";

export default function TestWallet() {
  const { DEFAULT_WALLET_DATA, walletData, setWalletData } = useWalletData();

  const [detectedWallets, setDetectedWallets] = useState<
    EIP6963ProviderDetail[]
  >([]);

  const detectedWallet = detectedWallets.find(
    (item) => item.info.name === walletData.walletName
  )!;

  const walletIconSrc = WALLETS.find(
    (item) => item.name === walletData.walletName
  )?.icon;

  const isConnected = walletData.connected;

  const currentNetwork = NETWORKS.find((n) => n.name === walletData.network)!;

  const handleChangeNetwork = async (networkName: string) => {
    const targetNetwork = NETWORKS.find((n) => n.name === networkName)!;
    try {
      // 切换网络
      await walletData.provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${targetNetwork?.chainId.toString(16)}` },
      ]);

      const newProvider = new ethers.BrowserProvider(detectedWallet.provider);
      // 切换成功后，更新余额和网络信息
      const balance = await newProvider.getBalance(walletData.address);
      const newBalance = ethers.formatEther(balance);
      const formattedBalance = parseFloat(newBalance).toFixed(2);

      setWalletData({
        ...walletData,
        provider: newProvider,
        balance: {
          amount: formattedBalance,
          symbol: targetNetwork?.symbol,
        },
        network: targetNetwork?.name,
      });
    } catch (error) {
      console.error("切换网络失败", error);
    }
  };

  const handleChangeInnerWallet = (innerWallet: string) => {
    console.log("Selected innerWallet:", innerWallet);
  };

  const onLogout = async () => {
    try {
      await detectedWallet.provider.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
    } catch (error) {
      console.error("wallet_revokePermissions not supported", error);
    } finally {
      setWalletData(DEFAULT_WALLET_DATA);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Test Wallet</h1>
      {isConnected ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <div className={walletStyles.balanceBar}>
            <div className={walletStyles.networkInfo}>
              <Image
                className={walletStyles.networkIcon}
                src={currentNetwork?.icon || ""}
                alt=""
                width={30}
                height={30}
              />
              <select
                className={walletStyles.networkSelect}
                defaultValue={walletData.network}
                onChange={(e) => handleChangeNetwork(e.target.value)}
              >
                {NETWORKS.map((network) => (
                  <option key={network.name} value={network.name}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={walletStyles.balanceInfo}>
              {walletData.balance.amount} {walletData.balance.symbol}
            </div>
            <div className={walletStyles.addressInfo}>
              <Image
                className={walletStyles.networkIcon}
                src={walletIconSrc}
                alt=""
                width={30}
                height={30}
              />

              <select
                className={walletStyles.addressSelect}
                defaultValue={walletData.address}
                onChange={(e) => {
                  handleChangeInnerWallet(e.target.value);
                }}
              >
                {[walletData.address].map((item) => (
                  <option
                    key={item}
                    className={walletStyles.addressOption}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className={`${styles.closeButton} ${walletStyles.logoutButton}`}
                onClick={onLogout}
              >
                注销
              </button>
            </div>
          </div>
          <h1 className={walletStyles.title}>Welcome connect !</h1>
        </div>
      ) : (
        <ConnectWalletModal
          setWalletData={setWalletData}
          detectedWallets={detectedWallets}
          setDetectedWallets={setDetectedWallets}
        />
      )}
    </div>
  );
}
