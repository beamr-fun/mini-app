import { Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { TableHeader, TableRow } from './TableItems';
import { usePoolAccount } from '../../hooks/usePoolAccount';
import { useMemo } from 'react';

export const Receiving = ({
  onConnectClick,
  poolsToConnect,
  isLoadingConnect,
}: {
  isLoadingConnect: boolean;
  poolsToConnect: string[];
  onConnectClick: (poolId: string) => void;
}) => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();
  const { userPoolAddress } = usePoolAccount();

  const filteredIncoming = useMemo(() => {
    if (!userSubscription) return null;

    if (userSubscription && userSubscription.incoming.length === 0) {
      return [];
    }

    if (!userPoolAddress) return userSubscription.incoming;

    return userSubscription.incoming.filter((item) => {
      const receivingAddress = item.id.split('_')?.[1];

      return receivingAddress?.toLowerCase() === userPoolAddress.toLowerCase();
    });
  }, [userSubscription, userPoolAddress]);

  if (!userSubscription) {
    return <Text>No Subscription</Text>;
  }

  if (
    (userSubscription && userSubscription.incoming.length === 0) ||
    filteredIncoming?.length === 0
  )
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={false} />
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No incoming streams
          </Text>
          <Text c={colors.gray[2]}>No on has beamed to you yet.</Text>
        </Flex>
      </Stack>
    );

  return (
    <Stack gap="sm">
      <TableHeader sending={false} />
      <Stack gap="sm">
        {userSubscription.incoming.map((item) => {
          const perUnitFlowRate =
            BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
          const beamFlowRate = perUnitFlowRate * BigInt(item.units);
          const percentage = Number(
            (
              (Number(item.units) / Number(item.beamPool?.totalUnits)) *
              100
            ).toFixed(2)
          );

          return (
            <TableRow
              sending={false}
              key={item.id}
              isLoadingConnect={isLoadingConnect}
              isConnected={item.isReceiverConnected}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.from?.profile?.pfp_url || ''}
              isConnectSelected={poolsToConnect.includes(
                item?.beamPool?.id as string
              )}
              connectOnClick={
                item?.beamPool?.id
                  ? () => onConnectClick(item?.beamPool?.id as string)
                  : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
