import { Box, useMantineTheme } from '@mantine/core';
import { useUser } from '../hooks/useUser';

export const ConnectionIndicator = () => {
  const { colors } = useMantineTheme();

  const { user, userSubscription } = useUser();

  const isPartlyConnected = user && !userSubscription;

  const isConnected = user && userSubscription;

  const color = isConnected
    ? colors.green[7]
    : isPartlyConnected
      ? colors.yellow[7]
      : colors.red[7];

  return (
    <Box
      pos="absolute"
      bg={color}
      h={8}
      style={{ borderRadius: '16px' }}
      w={8}
      top={2}
      right={-1}
    />
  );
};
