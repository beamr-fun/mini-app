import { http, createConfig } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
  connectors: [miniAppConnector()],
});
