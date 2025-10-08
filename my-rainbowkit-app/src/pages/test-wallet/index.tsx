import React, { useState } from "react";
import { ethers } from "ethers";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import Image from "next/image";
import useWalletData from "@/hooks/useWalletData";
import { NETWORKS, WALLETS } from "@/constants";
import styles from "@/styles/Home.module.css";
import walletStyles from "@/styles/Wallet.module.css";

export default function TestWallet() {
  const { DEFAULT_WALLET_DATA, walletData, setWalletData } = useWalletData();

  const walletIconSrc = WALLETS.find(
    (item) => item.name === walletData.walletName
  )?.icon;

  const isConnected = walletData.connected;

  const currentNetwork = NETWORKS.find((n) => n.name === walletData.network)!;

  const handleChangeNetwork = async (networkName: string) => {
    try {
      const targetNetwork = NETWORKS.find((n) => n.name === networkName)!;

      // 移除旧的监听器,避免重复监听
      if (window.ethereum?.removeAllListeners) {
        window.ethereum.removeAllListeners("chainChanged");
      }

      // 先设置监听器
      const handleChainChanged = async () => {
        try {
          // 创建新的 provider 实例,绑定到新网络
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          const network = await newProvider.getNetwork();
          const balance = await newProvider.getBalance(walletData.address);
          const ethBalance = ethers.formatEther(balance);
          const formattedBalance = parseFloat(ethBalance).toFixed(2);

          const newNetwork = NETWORKS.find(
            (n) => n.chainId === Number(network.chainId)
          );

          setWalletData({
            ...walletData,
            provider: newProvider, // 更新 provider
            network: newNetwork?.name || networkName,
            balance: {
              amount: formattedBalance,
              symbol: targetNetwork.symbol,
            },
          });
        } catch (error) {
          console.error("更新网络信息失败", error);
        }
      };

      window.ethereum.once("chainChanged", handleChainChanged);

      // 再切换网络
      await walletData.provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${targetNetwork?.chainId.toString(16)}` },
      ]);
    } catch (error: any) {
      console.error("切换网络失败", error);
      // 清理监听器
      if (window.ethereum?.removeAllListeners) {
        window.ethereum.removeAllListeners("chainChanged");
      }
    }
  };

  const handleChangeInnerWallet = (innerWallet: string) => {
    console.log("Selected innerWallet:", innerWallet);
  };

  const onLogout = async () => {
    try {
      // 断开 MetaMask 连接
      if (window.ethereum?.request) {
        // 注意: MetaMask 没有官方的断开连接方法,但我们可以清除权限
        // 用户需要在 MetaMask 中手动断开,或者刷新页面后重新授权
        await window.ethereum
          .request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }],
          })
          .catch(() => {
            // 如果不支持 wallet_revokePermissions,忽略错误
            console.log("wallet_revokePermissions not supported");
          });
      }

      // 移除所有监听器
      if (window.ethereum?.removeAllListeners) {
        window.ethereum.removeAllListeners();
      }

      // 清除本地状态
      setWalletData(DEFAULT_WALLET_DATA);
    } catch (error) {
      console.error("注销失败", error);
      // 即使出错也清除状态
      setWalletData(DEFAULT_WALLET_DATA);
      window.location.reload();
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
        <ConnectWalletModal setWalletData={setWalletData} />
      )}
    </div>
  );
}
