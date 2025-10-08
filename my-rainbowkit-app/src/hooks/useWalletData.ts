import { useState } from "react";

interface WalletData {
  address: string;
  balance: {
    amount: string;
    symbol: string;
  };
  connected: boolean;
  walletName: string;
  provider: any;
  network: string;
}

const DEFAULT_WALLET_DATA: WalletData = {
  address: "",
  balance: {
    amount: "0.00",
    symbol: "-",
  },
  connected: false,
  walletName: "",
  provider: null,
  network: "",
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
