import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import { useAccount } from 'wagmi';
import { truncateAddress } from '../utils/common';
// import { ConnectionIndicator } from './ConnectionIndicator';
// import { useUser } from '../hooks/useUser';

export const Header = () => {
  const { address } = useAccount();

  // const { user } = useUser();

  const addressText =
    // user
    // ? user.display_name
    // :
    truncateAddress(address || '0x');

  const pfp =
    //  user?.pfp_url ||
    `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%" h="50px">
      <Group w="100%" justify="space-between">
        <Title order={1} fz="18" c="dark.3" fw="700">
          beamR
        </Title>
        <Group gap="8">
          <Avatar src={pfp} size="24" />
          <Text fz={'sm'} fw="400">
            {addressText}
          </Text>
        </Group>
        {/* <ConnectionIndicator /> */}
      </Group>
    </Box>
  );
};
