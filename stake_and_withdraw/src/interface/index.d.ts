export interface EIP6963ProviderDetail {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  };
  provider: any;
}

export interface EIP6963AnnounceProviderEvent extends Event {
  detail: EIP6963ProviderDetail;
}

export interface WalletData {
  address?: `0x${string}`;
  balance?: {
    amount?: BigNumberish;
    symbol?: string;
  };
  connected?: boolean;
  walletName: string;
  provider?: any;
  network?: string;
  connector?: any;
}

export type ConnectWalletModalProps = {
  setWalletData?: React.Dispatch<React.SetStateAction<WalletData>>;
  detectedWallets?: EIP6963ProviderDetail[];
  setDetectedWallets?: React.Dispatch<
    React.SetStateAction<EIP6963ProviderDetail[]>
  >;
  customStyles?: React.CSSProperties;
};
