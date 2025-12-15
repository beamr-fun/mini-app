import { Address } from 'viem';
import { isTestnet } from '../utils/setup';

type Addresses = {
  BEAMR: Address;
  SUPER_TOKEN: Address;
  GDA_FORWARDER: Address;
  SUPER_FLUID: Address;
  COLLECTOR_POOL: Address;
  GDA: Address;
};

export const ADDR_DEV: Addresses = {
  SUPER_TOKEN: '0x19A30530209342cB2D94aD2693983A5cF7B77b79',
  BEAMR: '0x74A7b2e23D690467E26E86220B9B5b081E5282cb',
  GDA_FORWARDER: '0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08',
  SUPER_FLUID: '0x109412E3C84f0539b43d39dB691B08c90f58dC7c',
  GDA: '0x53F4f44C813Dc380182d0b2b67fe5832A12B97f8',
  COLLECTOR_POOL: '0x91f6999Cf1c917204E305BDeC7704725ad44EB67',
} as const;

export const ADDR_PROD: Addresses = {
  SUPER_TOKEN: '0x',
  BEAMR: '0x',
  GDA_FORWARDER: '0x',
  SUPER_FLUID: '0x',
  GDA: '0x',
  COLLECTOR_POOL: '0x',
} as const;

export const ADDR = isTestnet ? ADDR_DEV : ADDR_PROD;
