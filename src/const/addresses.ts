import { Address } from 'viem';

type Addresses = {
  BEAMR: Address;
  SUPER_TOKEN: Address;
  GDA_FORWARDER: Address;
  SUPER_FLUID: Address;
};

export const ADDR_DEV: Addresses = {
  SUPER_TOKEN: '0x19A30530209342cB2D94aD2693983A5cF7B77b79',
  BEAMR: '0xaA44dC224415459f3b026e66047adad912EfEC69',
  GDA_FORWARDER: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
  SUPER_FLUID: '0x109412E3C84f0539b43d39dB691B08c90f58dC7c',
} as const;

export const ADDR_PROD: Addresses = {
  SUPER_TOKEN: '0x',
  BEAMR: '0x',
  GDA_FORWARDER: '0x',
  SUPER_FLUID: '0x',
} as const;

export const ADDR = import.meta.env.VITE_ENV === 'dev' ? ADDR_DEV : ADDR_PROD;
