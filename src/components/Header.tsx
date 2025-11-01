import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import { useAccount } from 'wagmi';
import { truncateAddress } from '../utils/common';
import { useUser } from '../hooks/useUser';
import { ConnectionIndicator } from './ConnectionIndicator';
// import { ConnectionIndicator } from './ConnectionIndicator';
// import { useUser } from '../hooks/useUser';

export const Header = () => {
  const { address } = useAccount();

  const { user } = useUser();

  const pfp = user?.pfp_url || `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%" mb={32}>
      <Group w="100%" justify="end">
        <Box pos={'relative'}>
          <Avatar src={pfp} size="32" />
          {/* <ConnectionIndicator /> */}
        </Box>
      </Group>
    </Box>
  );
};
