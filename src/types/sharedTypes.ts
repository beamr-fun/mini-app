import { User } from '@neynar/nodejs-sdk/build/api';

export type JWTPayload = {
  sub: number;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
};

export type AuthResponse = {
  success: boolean;
  user: User;
  jwtPayload: JWTPayload;
};
export type FCUsersResponse = {
  success: boolean;
  users: User[];
};
