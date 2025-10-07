"use client";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

const wallets = [
  { name: "MetaMask", icon: "/metamask.jpg" },
  { name: "Rainbow", icon: "/rainbow.png" },
];

const networks = [
  {
    name: "Sepolia",
    icon: "https://sepolia.etherscan.io/images/favicon3-light.ico",
  },
  {
    name: "Polygon",
    icon: "https://amoy.polygonscan.com/assets/generic/html/favicon-light.ico",
  },
  {
    name: "Ethereum",
    icon: "https://sepolia.etherscan.io/images/svg/brands/ethereum-original-light.svg",
  },
];

const addressList = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
  },
  { address: "0xabcdef1234567890abcdef1234567890abcdef12" },
  { address: "0x7890abcdef1234567890abcdef1234567890abcd" },
];
export default function ConnectWalletModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [connected, setConnected] = useState<boolean>(true);

  const [currentNetworkName, setCurrentNetworkName] = useState<string>(
    networks[0].name
  );
  const currentNetwork = networks.find((n) => n.name === currentNetworkName);

  const [balance, setBalance] = useState({
    amount: "5.38",
    symbol: "ETH",
  });

  const handleChangeNetwork = (networkName: string) => {
    setCurrentNetworkName(networkName);
    console.log("Selected network:", networkName);
  };

  const handleChangeInnerWallet = (innerWallet: string) => {
    // setCurrentNetworkName(networkName);
    console.log("Selected innerWallet:", innerWallet);
  };

  if (connected) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "30px",
            }}
          >
            <Image
              style={{ borderRadius: "50%" }}
              src={currentNetwork?.icon || ""}
              alt=""
              width={30}
              height={30}
            />
            <select
              style={{ height: "30px", width: "120px", marginLeft: "12px" }}
              defaultValue={networks[0].name}
              onChange={(e) => handleChangeNetwork(e.target.value)}
            >
              {networks.map((network) => (
                <option
                  key={network.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  value={network.name}
                >
                  <div style={{ marginLeft: "12px", fontSize: "18px" }}>
                    {network.name}
                  </div>
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              marginRight: "30px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {balance.amount} {balance.symbol}
          </div>
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "30px",
            }}
          >
            <Image
              style={{ borderRadius: "50%" }}
              src="/avatar.jpg"
              alt=""
              width={30}
              height={30}
            />

            <select
              style={{
                height: "30px",
                width: "200px",
                marginLeft: "12px",
                color: "#000",
                border: "none",
              }}
              defaultValue={addressList[0].address}
              onChange={(e) => {
                handleChangeInnerWallet(e.target.value);
              }}
            >
              {addressList.map((item) => (
                <option
                  key={item.address}
                  style={{
                    color: "#fff",
                    backgroundColor: "#000",
                  }}
                  value={item.address}
                >
                  <div style={{ marginLeft: "12px", fontSize: "18px" }}>
                    {item.address}
                  </div>
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className={styles.closeButton}
              style={{ height: "30px" }}
              onClick={() => setConnected(false)}
            >
              注销
            </button>
          </div>
        </div>
        <h1 style={{ fontSize: "60px" }}>Welcome connect !</h1>
      </div>
    );
  }
  return (
    <div>
      <button className={styles.testButton} onClick={() => setIsOpen(true)}>
        连接钱包
      </button>
      {isOpen && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            zIndex: 999,
            backgroundColor: "#dedede",
            position: "fixed",
            top: 0,
            left: 0,
          }}
          onClick={(e) => {
            setIsOpen(false);
            e.stopPropagation();
          }}
        >
          <div
            style={{
              border: "2px solid #000",
              padding: 20,
              width: 400,
              height: 200,
              position: "fixed",
              left: "calc(50% - 200px)",
              top: "calc(50% - 100px)",
              zIndex: 1000,
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "10px",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <h3>连接钱包</h3>
              <button
                className={styles.closeButton}
                style={{
                  position: "absolute",
                  right: 0,
                }}
                onClick={() => setIsOpen(false)}
              >
                关闭
              </button>
            </div>

            <div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {wallets.map((wallet) => (
                  <li
                    className={styles.walletLi}
                    key={wallet.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ backgroundColor: "#fff" }}
                      src={wallet.icon}
                      alt={wallet.name}
                      width={20}
                      height={20}
                    />
                    <div style={{ marginLeft: "12px", fontSize: "18px" }}>
                      {wallet.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
