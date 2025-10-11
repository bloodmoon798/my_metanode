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
import { http } from "wagmi";

const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: PROJECT_ID,
  chains: [sepolia, polygonAmoy, mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [mainnet.id]: http(),
  },
});
