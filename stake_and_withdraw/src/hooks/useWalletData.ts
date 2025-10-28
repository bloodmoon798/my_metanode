import { useState } from "react";
import type { WalletData } from "@/interface";

const DEFAULT_WALLET_DATA: WalletData = {
  address: `0x`,
  balance: {
    amount: "0.00",
    symbol: "-",
  },
  connected: false,
  walletName: "",
  provider: null,
  network: "",
  connector: null,
};

const useWalletData = () => {
  const [walletData, setWalletData] = useState<WalletData>(DEFAULT_WALLET_DATA);

  return {
    DEFAULT_WALLET_DATA,
    walletData,
    setWalletData,
  };
};

export default useWalletData;
