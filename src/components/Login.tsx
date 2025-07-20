import { Avatar, Box, Button, Group, Text, Tooltip } from '@mantine/core';
import { useAccount, useConnect } from 'wagmi';
import { useState } from 'react';
import { Context } from '@farcaster/frame-sdk';
import { useMiniAppContext } from '../hooks/useMiniAppContext';
import { truncateAddress } from '../utils/common';
import { useUser } from '../hooks/useUser';
import { ConnectionIndicator } from './ConnectionIndicator';

export const Login = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  // sdf
  const { user, isMiniApp } = useMiniAppContext();

  const { isSocketConnected } = useUser();

  if (user && address && isMiniApp) {
    return (
      <Box m="md">
        <Group gap="4">
          <Avatar src={user.pfpUrl} size="32" />
          <Text>{user.displayName}</Text>
          <ConnectionIndicator />
        </Group>
      </Box>
    );
  }

  if (address && isConnected) {
    return (
      <Box m="md">
        <Group gap="8">
          <Avatar src={`https://effigy.im/a/${address}.svg`} size="32" />
          <Text>{truncateAddress(address)}</Text>
          <ConnectionIndicator />
        </Group>
      </Box>
    );
  }

  return (
    <Button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </Button>
  );
};
