import React, { useState } from "react";
import { ethers } from "ethers";
import { WALLETS, NETWORKS } from "@/constants";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import walletStyles from "@/styles/Wallet.module.css";

export default function ConnectWalletModal({ setWalletData }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async (walletName: string) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log(provider, "provider");

        // 1. 拿到当前钱包帐户
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        // 2. 拿到当前网络
        const network = await provider.getNetwork();
        console.log(network, "network");

        // 3. 拿到钱包余额并做处理
        const balance = await provider.getBalance(address);
        const newBalance = ethers.formatEther(balance);
        const formattedBalance = parseFloat(newBalance).toFixed(2);

        setWalletData({
          provider,
          walletName,
          address,
          balance: {
            amount: formattedBalance,
            symbol: NETWORKS.find((n) => n.name === network?.name)?.symbol,
          },
          connected: true,
          network: network?.name,
        });

        setIsOpen(false);
      } catch (error: any) {
        console.log("无法连接", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(`请安装 ${walletName}`);
    }
  };

  return (
    <div>
      <button className={styles.testButton} onClick={() => setIsOpen(true)}>
        连接钱包
      </button>
      {isOpen && (
        <div
          className={walletStyles.modalOverlay}
          onClick={(e) => {
            setIsOpen(false);
            e.stopPropagation();
          }}
        >
          <div
            className={walletStyles.modalContent}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={walletStyles.modalHeader}>
              <h3>连接钱包</h3>
              <button
                className={`${styles.closeButton}  ${walletStyles.closeButton}`}
                onClick={() => setIsOpen(false)}
              >
                关闭
              </button>
            </div>

            <div>
              {loading ? (
                <div style={{ marginLeft: 20 }}>Loading...</div>
              ) : (
                <ul className={walletStyles.walletList}>
                  {WALLETS.map((wallet) => (
                    <li
                      className={walletStyles.walletLi}
                      key={wallet.name}
                      onClick={() => connectWallet(wallet.name)}
                    >
                      <Image
                        className={walletStyles.walletIcon}
                        src={wallet.icon}
                        alt={wallet.name}
                        width={20}
                        height={20}
                      />
                      <div className={walletStyles.walletName}>
                        <div>{wallet.name}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
