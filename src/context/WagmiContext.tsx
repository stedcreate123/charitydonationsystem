import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { FC, ReactNode } from "react";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURAIO_API_KEY! })]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

interface WagmiProviderProps {
  children: ReactNode;
}

export const WagmiProvider: FC<WagmiProviderProps> = ({ children }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
