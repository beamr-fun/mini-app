import { Box, Button, Stack, Text, Title } from '@mantine/core';
import { Address } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import {
  connectToPool,
  createPool,
  distributeFlow,
  grantRole,
  revokeRole,
  updateMemberUnits,
  updateMetadata,
} from '../utils/interactions';
import { PoolMetadata, PoolType } from '../validation/poolMetadata';

export const SubTest = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any>(null);
  const { data: walletClient } = useWalletClient();

  const _createPool = async () => {
    if (!address) return;

    createPool(address, 11650);
  };

  const _distributeFlow = async () => {
    if (!walletClient || !address) return;

    distributeFlow(
      '0x2F06E570c82581bE846854c446eCe3aBD6d76A6b',
      address,
      BigInt(100e18),
      walletClient
    );
  };

  const _grantRole = async () => {
    grantRole(
      '0xc135998a41ad04c783442cf9a198fef2ab059ea9b14fefec89e1012a24de70ec',
      '0x9dB251309d2a789A8Bd72F49e711644e3612CdBb',
      walletClient
    );
  };

  const _revokeRole = async () => {
    revokeRole(
      '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
      '0xD0d520d7F5863eE03F6B502884f4456Bd7A9D963',
      walletClient
    );
  };

  const _updateMemberUnits = async () => {
    const memberList: { account: Address; units: bigint }[] = [
      {
        account: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
        units: 6n,
      },
      {
        account: '0x57abda4ee50Bb3079A556C878b2c345310057569',
        units: 12n,
      },
      {
        account: '0xD800B05c70A2071BC1E5Eac5B3390Da1Eb67bC9D',
        units: 24n,
      },
      {
        account: '0x57ffb33cC9D786da4087d970b0B0053017f26afc',
        units: 6n,
      },
      {
        account: '0x511449dD36e5dB31980AA0452aAAB95b9a68ae99',
        units: 18n,
      },
      {
        account: '0x0e65b98A3836ad03Dd88A3eEb39fdCFBeC196c93',
        units: 6n,
      },
    ];

    const poolAddresses = Array(6).fill(
      '0x2F06E570c82581bE846854c446eCe3aBD6d76A6b'
    );

    updateMemberUnits(memberList, poolAddresses);
  };

  const _updateMetadata = async () => {
    const metadata: PoolMetadata = {
      creatorFID: 11650,
      poolType: PoolType.Tip,
      name: 'Test Pool - Has been updated',
    };

    updateMetadata('0x2F06E570c82581bE846854c446eCe3aBD6d76A6b', metadata);
  };

  const _connect = async () => {
    connectToPool('0x2F06E570c82581bE846854c446eCe3aBD6d76A6b');
  };

  return (
    <Box>
      <Title order={2} mb="md">
        Core Functions
      </Title>
      <Stack>
        <Box>
          <Title order={4} mb="md">
            Create Pool
          </Title>
          <Button onClick={_createPool} mb="md">
            Create Pool
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Distribute Flow
          </Title>
          <Button onClick={_distributeFlow} mb="md">
            Distribute Flow
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Grant Role
          </Title>
          <Button onClick={_grantRole} mb="md">
            Grant Role
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Revoke Role
          </Title>
          <Button onClick={_revokeRole} mb="md">
            Revoke Role
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Update Member Units
          </Title>
          <Button onClick={_updateMemberUnits} mb="md">
            Update Member Units
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Update Metadata
          </Title>
          <Button onClick={_updateMetadata} mb="md">
            Update Metadata
          </Button>
        </Box>
        <Box>
          <Title order={4} mb="md">
            Connect
          </Title>
          <Button onClick={_connect} mb="md">
            Connect
          </Button>
        </Box>
      </Stack>

      <Stack>
        {data?.map((addr: Address) => (
          <Text fz="sm" key={addr}>
            {addr}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};
