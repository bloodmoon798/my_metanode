import React from "react";
import styles from "@/styles/Stake.module.css";
import StakeHeader from "@/components/StakeHeader";
import StakeFooter from "@/components/StakeFooter";

export default function StakePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <StakeHeader />
      <div className={styles.content} style={{ color: "#fff" }}>
        {children}
        <div className={styles.welcomeMessage}>
          Welcome to my Stake Project!
        </div>
      </div>
      <StakeFooter />
    </div>
  );
}
