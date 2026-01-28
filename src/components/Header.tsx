import { Avatar, Box, Group } from '@mantine/core';
import { useAccount } from 'wagmi';
import { useUser } from '../hooks/useUser';
import { ConnectionIndicator } from './ConnectionIndicator';
import { ActivityDrawer } from './ActivityDrawer/ActivityDrawer';

export const Header = () => {
  const { address } = useAccount();

  const { user } = useUser();

  const pfp = user?.pfp_url || `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%">
      <Group w="100%" justify="space-between">
        <ActivityDrawer />
        <Box pos={'relative'} ml="auto">
          <Avatar src={pfp} size="32" />
          <ConnectionIndicator />
        </Box>
      </Group>
    </Box>
  );
};
