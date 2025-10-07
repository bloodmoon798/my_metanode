import React from "react";
import styles from "@/styles/Home.module.css";
import ConnectWalletModal from "@/components/ConnectWalletModal";

export default function TestWallet() {
  return (
    <div className={styles.main}>
      <h1>Test Wallet</h1>

      <ConnectWalletModal />
    </div>
  );
}
