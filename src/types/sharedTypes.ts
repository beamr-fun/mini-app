import { Server } from 'socket.io';
import { Address } from 'viem';

export const IOEvent = {
  PoolLoad: 'pool:load',
  WalletConnected: 'wallet:connect',
  WalletConnectError: 'wallet:connect_error',
} as const;

export type IOEvent = (typeof IOEvent)[keyof typeof IOEvent];

export type ServerToClientEvents = {
  //   [IOEvent.Connect]: () => void;
  //   [IOEvent.Disconnect]: () => void;
  [IOEvent.PoolLoad]: (data: PoolResponse) => void;
  [IOEvent.WalletConnected]: (data: { address: Address }) => void;
  [IOEvent.WalletConnectError]: (data: {
    error: string;
    message: string;
  }) => void;
};

export type ClientToServerEvents = {
  [IOEvent.WalletConnected]: (data: { address: Address }) => void;
};

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents>;

export type PoolResponse = {
  pool?: Pool;
  poolId?: string;
  incomingBeams?: Beam[];
  outgoingBeams?: Beam[];
  isLoading?: boolean;
  errors?: string[];
};

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
