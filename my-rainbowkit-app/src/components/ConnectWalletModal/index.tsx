import React, { useState /* useEffect */ } from "react";
// import { ethers } from "ethers";
import { /* NETWORKS ,*/ WALLETS } from "@/constants";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import walletStyles from "@/styles/Wallet.module.css";
import type {
  // EIP6963ProviderDetail,
  // EIP6963AnnounceProviderEvent,
  ConnectWalletModalProps,
} from "@/interface";

import { useConnect } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function ConnectWalletModal({
  // detectedWallets,
  // setDetectedWallets,
  setWalletData,
  customStyles,
}: ConnectWalletModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { connectors } = useConnect();
  // console.log(address, "address");

  const connectWallet = async (
    /* wallet: EIP6963ProviderDetail */
    walletName: string
  ) => {
    try {
      setLoading(true);
      // 根据钱包名称找到对应的 connector
      const connector = connectors.find(
        (c) => c.name.toLowerCase() === walletName.toLowerCase()
      );
      // console.log("connector", connector);
      if (connector) {
        await connector.connect({ chainId: sepolia.id });

        // setWalletData({
        //   walletName,
        //   // connected: true,
        //   network: sepolia.name.toLowerCase(),
        // });
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error("连接失败", error.message);
    }
    // try {
    //   setLoading(true);

    //   const browserProvider = new ethers.BrowserProvider(wallet.provider);
    //   // 拿到当前钱包帐户
    //   const accounts = await browserProvider.send("eth_requestAccounts", []);
    //   const address = accounts[0];

    //   // 使用JSON-RPC provider,默认连接第一个网络Sepolia
    //   const defaultNetwork = NETWORKS[0];

    //   const jsonRpcProvider = new ethers.JsonRpcProvider(defaultNetwork.rpcUrl);

    //   // 3. 拿到钱包余额并做处理
    //   const balance = await jsonRpcProvider.getBalance(address);
    //   const newBalance = ethers.formatEther(balance);
    //   const formattedBalance = parseFloat(newBalance).toFixed(2);

    //   setWalletData({
    //     provider: browserProvider,
    //     walletName: wallet.info.name,
    //     address,
    //     balance: {
    //       amount: formattedBalance,
    //       symbol: defaultNetwork?.symbol,
    //     },
    //     connected: true,
    //     network: defaultNetwork?.name,
    //   });

    //   setIsOpen(false);
    // } catch (error: any) {
    //   console.log("连接失败", error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  // const walletMap = new Map<string, EIP6963ProviderDetail>();

  // // 监听钱包广播事件
  // const handleAnnouncement = (event: EIP6963AnnounceProviderEvent) => {
  //   const { detail } = event;
  //   walletMap.set(detail.info.uuid, detail);
  //   setDetectedWallets(Array.from(walletMap.values()));
  // };

  // useEffect(() => {
  //   window.addEventListener(
  //     "eip6963:announceProvider",
  //     handleAnnouncement as EventListener
  //   );

  //   // 请求所有钱包广播自己
  //   window.dispatchEvent(new Event("eip6963:requestProvider"));

  //   return () => {
  //     window.removeEventListener(
  //       "eip6963:announceProvider",
  //       handleAnnouncement as EventListener
  //     );
  //   };
  // }, []);

  return (
    <div>
      <button
        className={styles.testButton}
        onClick={() => setIsOpen(true)}
        style={{ ...customStyles }}
      >
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
                  {/* {detectedWallets.map((wallet) => (
                    <li
                      className={walletStyles.walletLi}
                      key={wallet.info.uuid}
                      onClick={() => connectWallet(wallet)}
                    >
                      <Image
                        className={walletStyles.walletIcon}
                        src={wallet.info.icon}
                        alt={wallet.info.name}
                        width={20}
                        height={20}
                      />
                      <div className={walletStyles.walletName}>
                        <div>{wallet.info.name}</div>
                      </div>
                    </li>
                  ))} */}

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
