export type JWTPayload = {
  sub: number;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
};

export type FCUser = {
  fid: number;
  username: string;
  display_name?: string;
  pfp_url?: string;
  eth_addresses: string[];
  custody_address?: string;
  primary_address: string | null;
  raw_data: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
  expires_at?: Date;
};

export type AuthResponse = {
  success: boolean;
  user: FCUser;
  jwtPayload: JWTPayload;
};
export type FCUsersResponse = {
  success: boolean;
  users: FCUser[];
};
