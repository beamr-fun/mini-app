export const BeamRABI = [
  {
    inputs: [
      { internalType: 'address[]', name: '_admins', type: 'address[]' },
      { internalType: 'address[]', name: '_rootAdmins', type: 'address[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [], name: 'Unauthorized', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'adminRole',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'rootAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'transferabilityForUnitsOwner',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'distributionFromAnyAddress',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType: 'struct PoolConfig',
        name: 'config',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'poolAdminRole',
        type: 'bytes32',
      },
      {
        components: [
          { internalType: 'uint256', name: 'protocol', type: 'uint256' },
          { internalType: 'string', name: 'pointer', type: 'string' },
        ],
        indexed: false,
        internalType: 'struct IBeamR.Metadata',
        name: 'metadata',
        type: 'tuple',
      },
    ],
    name: 'PoolCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        components: [
          { internalType: 'uint256', name: 'protocol', type: 'uint256' },
          { internalType: 'string', name: 'pointer', type: 'string' },
        ],
        indexed: false,
        internalType: 'struct IBeamR.Metadata',
        name: 'metadata',
        type: 'tuple',
      },
    ],
    name: 'PoolMetadataUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROOT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISuperToken',
        name: '_poolSuperToken',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'transferabilityForUnitsOwner',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'distributionFromAnyAddress',
            type: 'bool',
          },
        ],
        internalType: 'struct PoolConfig',
        name: '_poolConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'uint8', name: 'decimals', type: 'uint8' },
        ],
        internalType: 'struct PoolERC20Metadata',
        name: '_erc20Metadata',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint128', name: 'units', type: 'uint128' },
        ],
        internalType: 'struct IBeamR.Member[]',
        name: '_members',
        type: 'tuple[]',
      },
      { internalType: 'address', name: '_creator', type: 'address' },
      {
        components: [
          { internalType: 'uint256', name: 'protocol', type: 'uint256' },
          { internalType: 'string', name: 'pointer', type: 'string' },
        ],
        internalType: 'struct IBeamR.Metadata',
        name: '_metadata',
        type: 'tuple',
      },
    ],
    name: 'createPool',
    outputs: [
      {
        internalType: 'contract ISuperfluidPool',
        name: 'beamPool',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_poolAddress', type: 'address' },
    ],
    name: 'poolAdminKey',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_poolAddress', type: 'address' },
      { internalType: 'address', name: '_newCreator', type: 'address' },
      { internalType: 'address', name: '_currentCreator', type: 'address' },
    ],
    name: 'rescuePoolCreator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'account', type: 'address' },
          { internalType: 'uint128', name: 'units', type: 'uint128' },
        ],
        internalType: 'struct IBeamR.Member[]',
        name: '_members',
        type: 'tuple[]',
      },
      { internalType: 'address[]', name: 'poolAddresses', type: 'address[]' },
    ],
    name: 'updateMemberUnits',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_poolAddress', type: 'address' },
      {
        components: [
          { internalType: 'uint256', name: 'protocol', type: 'uint256' },
          { internalType: 'string', name: 'pointer', type: 'string' },
        ],
        internalType: 'struct IBeamR.Metadata',
        name: '_metadata',
        type: 'tuple',
      },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
