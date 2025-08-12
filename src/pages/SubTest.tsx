import { Box, Button, Stack, Text, Title } from '@mantine/core';
import { Address } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { createPool } from '../utils/interactions';

export const SubTest = () => {
  const { address } = useAccount();
  const [data, setData] = useState<any>(null);
  const { data: walletClient } = useWalletClient();

  const _createPool = async () => {
    if (!address) return;

    createPool(address, 11650);
  };

  const _distributeFlow = async () => {};

  const _grantRole = async () => {};

  const _revokeRole = async () => {};

  const _updateMemberUnits = async () => {};

  const _updateMetadata = async () => {};

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
