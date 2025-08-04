import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import { useAccount } from 'wagmi';
import { truncateAddress } from '../utils/common';
import { ConnectionIndicator } from './ConnectionIndicator';

export const Header = () => {
  const { isConnected, address } = useAccount();

  // const { user, isMiniApp } = useMiniAppContext();

  // const isConnectedFarcaster = user && isMiniApp && isConnected;

  // const isConnectedLocal = address && isConnected && !isConnectedFarcaster;

  // const addressText = isConnectedFarcaster
  //   ? user?.displayName
  //   : isConnectedLocal
  //     ? truncateAddress(address)
  //     : 'Connect Wallet';

  // const pfp = isConnectedFarcaster
  //   ? user?.pfpUrl
  //   : isConnectedLocal
  //     ? `https://effigy.im/a/${address}.svg`
  //     : '';

  // if (!isConnectedFarcaster && !isConnectedLocal) {
  //   return <Box w="100%" h="50px" />;
  // }
  // return (
  //   <Box w="100%" h="50px">
  //     <Group w="100%" justify="space-between">
  //       <Title order={1} ta={'center'} fz="18" c="dark.3" fw="700">
  //         beamZ
  //       </Title>
  //       <Group gap="8">
  //         <Avatar src={pfp} size="24" />
  //         <Text fz={'sm'} fw="400">
  //           {addressText}
  //         </Text>
  //       </Group>
  //       <ConnectionIndicator />
  //     </Group>
  //   </Box>
  // );
};
