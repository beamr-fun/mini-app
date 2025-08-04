import { User } from '@neynar/nodejs-sdk/build/api';
import { Server } from 'socket.io';
import { Address } from 'viem';

export type CFID = `${number}:${Address}`;

export const IOEvent = {
  PoolLoad: 'pool:load',
  WalletConnected: 'wallet:connect',
  UserAuthSuccess: 'user:auth_success',
  UserAuthError: 'user:auth_error',
  WalletConnectError: 'wallet:connect_error',
} as const;

export type IOEvent = (typeof IOEvent)[keyof typeof IOEvent];

export type ServerToClientEvents = {
  [IOEvent.PoolLoad]: (data: PoolResponse) => void;
  [IOEvent.WalletConnected]: (data: { address: Address }) => void;
  [IOEvent.WalletConnectError]: (data: {
    error: string;
    message: string;
  }) => void;
  [IOEvent.UserAuthSuccess]: (data: { user: User }) => void;
  [IOEvent.UserAuthError]: (data: { error: string; message: string }) => void;
};

export type ClientToServerEvents = {
  [IOEvent.WalletConnected]: (data: { address: Address }) => void;
};

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents>;

export type PoolResponse = {
  pool?: Pool;
  poolId?: string;
  hasPool: boolean;
  incomingBeams?: Beam[];
  outgoingBeams?: Beam[];
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
  // cfid - pool address - receiver address
  id: `${CFID}-${Address}-${Address}`;
  from: Address;
  to: Address;
  flowRate: string;
  status: BeamStatus;
  units: string;
  senderProfile?: User;
  receiverProfile?: User;
  // isConnected: boolean;
};
