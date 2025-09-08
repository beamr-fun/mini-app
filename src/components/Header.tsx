import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import { useAccount } from 'wagmi';
import { truncateAddress } from '../utils/common';
import { useUser } from '../hooks/useUser';
// import { ConnectionIndicator } from './ConnectionIndicator';
// import { useUser } from '../hooks/useUser';

export const Header = () => {
  const { address } = useAccount();

  const { user } = useUser();

  const addressText =
    // user
    // ? user.display_name
    // :
    truncateAddress(address || '0x');

  const pfp = user?.pfp_url || `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%" h="50px">
      <Group w="100%" justify="space-between">
        <Text fz="12" c="dark.3" fw="700">
          BEAMR
        </Text>
        <Avatar src={pfp} size="32" />
      </Group>
    </Box>
  );
};
