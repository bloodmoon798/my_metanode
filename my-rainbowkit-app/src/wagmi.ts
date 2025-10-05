import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  sepolia,
  polygonAmoy,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "d89da9f08a8a0455fb74a66d499ccf92",
  chains: [
    sepolia,
    polygonAmoy,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});
