export const WALLETS = [
  { name: "MetaMask", icon: "/metamask.jpg" },
  { name: "Rainbow", icon: "/rainbow.png" },
];

export const NETWORKS = [
  {
    name: "sepolia",
    icon: "https://sepolia.etherscan.io/images/svg/brands/ethereum-original-light.svg",
    chainId: 11155111,
    symbol: "ETH",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_API_KEY",
  },
  {
    name: "matic-amoy",
    icon: "https://amoy.polygonscan.com/assets/generic/html/favicon-light.ico",
    chainId: 80002,
    symbol: "AMO",
    rpcUrl:
      "https://polygon-amoy.infura.io/v3/YOUR_API_KEY",
  },
  {
    name: "mainnet",
    icon: "https://etherscan.io/images/svg/brands/ethereum-original.svg",
    chainId: 1,
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_API_KEY",
  },
];

export const PID = 0;
