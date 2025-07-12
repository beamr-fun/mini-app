import { http, createConfig } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector';
import { createPublicClient } from 'viem';

export const config = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http('https://opt-sepolia.g.alchemy.com/v2/IZOo16NkH3ZcDuCgGjYUS'),
});
