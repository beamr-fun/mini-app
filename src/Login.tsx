import { Avatar, Box, Button, Group, Text } from '@mantine/core';
import { useAccount, useConnect } from 'wagmi';
import sdk from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import { Context } from '@farcaster/frame-sdk';

export const Login = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const [userContext, setUserContext] = useState<Context.UserContext | null>(
    null
  );

  useEffect(() => {
    const getContext = async () => {
      const isMiniApp = await sdk.isInMiniApp();

      console.log('isMiniApp:', isMiniApp);

      if (!isMiniApp) {
        return;
      }

      const user = (await sdk.context).user;

      if (user) {
        setUserContext(user);
      }
    };

    if (isConnected && address) {
      console.log('Connected address:', address);
      getContext();
    }
  }, [isConnected, address]);

  if (userContext && address) {
    return (
      <Box m="md">
        <Group gap="4">
          <Avatar src={userContext.pfpUrl} size="32" />
          <Text>{userContext.displayName}</Text>
        </Group>
        {/* <Text>Address: {truncateAddress(address)}</Text> */}
      </Box>
    );
  }

  return (
    <Button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </Button>
  );
};
