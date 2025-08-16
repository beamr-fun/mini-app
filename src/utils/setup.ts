import { base, baseSepolia } from 'viem/chains';

export const isDev = import.meta.env.VITE_ENV === 'dev';
export const isAPIDev = import.meta.env.VITE_API_ENV === 'dev';
export const isIndexerDev = import.meta.env.VITE_INDEXER_ENV === 'dev';

export const network = isDev ? baseSepolia : base;

export const rpc = isDev
  ? import.meta.env.VITE_RPC_DEV
  : import.meta.env.VITE_RPC_PROD;

export const apiUrl = isAPIDev
  ? import.meta.env.VITE_API_DEV
  : import.meta.env.VITE_API_PROD;

export const apiKey = isAPIDev
  ? import.meta.env.VITE_API_KEY_DEV
  : import.meta.env.VITE_API_KEY_PROD;

export const indexerUrl = isIndexerDev
  ? import.meta.env.VITE_INDEXER_DEV
  : import.meta.env.VITE_INDEXER_PROD;
