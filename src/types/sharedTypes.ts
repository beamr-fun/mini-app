import { Address } from 'viem';

export enum PoolStatus {
  None,
  Created,
  AwaitingFlow,
  Open,
  Expired,
  Closed,
}

export enum BeamStatus {
  None,
  Closed,
  Open,
  Connected,
  Expired,
}

export type Pool = {
  id: string;
  creator: Address;
  admin: Address;
  tokenAddress: Address;
  flowRate: string;
  totalUnits: string;
  poolStatus: PoolStatus;
};

export type Beam = {
  // pool address - receiver address
  id: `${Address}-${Address}`;
  from: Address;
  to: Address;
  flowRate: string;
  status: BeamStatus;
  // isConnected: boolean;
};
