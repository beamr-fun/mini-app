import { base, optimismSepolia } from 'viem/chains';

export const isDev = import.meta.env.VITE_ENV === 'dev';
export const isAPIDev = import.meta.env.VITE_API_ENV === 'dev';

export const network = isDev ? base : base;

export const RPC = isDev
  ? import.meta.env.VITE_RPC_DEV
  : import.meta.env.VITE_RPC_PROD;

export const API_URL = isAPIDev
  ? import.meta.env.VITE_API_DEV
  : import.meta.env.VITE_API_PROD;

export const API_KEY = isAPIDev
  ? import.meta.env.VITE_API_KEY_DEV
  : import.meta.env.VITE_API_KEY_PROD;

export const SOCKET_URL = isDev
  ? import.meta.env.VITE_SOCKET_DEV
  : import.meta.env.VITE_SOCKET_PROD;
