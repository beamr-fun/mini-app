import { Avatar, Box, Button, Group, Text, Tooltip } from '@mantine/core';
import { useAccount, useConnect } from 'wagmi';
import { useState } from 'react';
import { Context } from '@farcaster/frame-sdk';
import { useMiniAppContext } from '../hooks/useMiniAppContext';
import { truncateAddress } from '../utils/common';

export const Login = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const [userContext, setUserContext] = useState<Context.UserContext | null>(
    null
  );
  // sdf
  const { user, isMiniApp } = useMiniAppContext();

  console.log('user', user);

  if (user && address && isMiniApp) {
    return (
      <Box m="md">
        <Group gap="4">
          <Avatar src={user.pfpUrl} size="32" />
          <Text>{user.displayName}</Text>
          <Tooltip label="In Farcaster">
            <Avatar bg="plum" size="6" />
          </Tooltip>
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
          <Tooltip label="Operating outside of Farcaster">
            <Avatar bg="red" size="6" />
          </Tooltip>
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
