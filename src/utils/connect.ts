import { http, createConfig } from 'wagmi';
import { base, optimismSepolia } from 'wagmi/chains';
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector';
import { Chain, createPublicClient } from 'viem';
import { isDev, RPC } from './setup';

const network = isDev ? optimismSepolia : base;

export const config = createConfig({
  chains: isDev ? [optimismSepolia] : [base],
  transports: {
    [optimismSepolia.id]: http(),
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const publicClient = createPublicClient({
  chain: network,
  transport: http(RPC),
});
