import { Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { TableHeader, TableRow } from './TableItems';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const Sending = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  const sorted = useMemo(() => {
    if (!userSubscription) return [];

    if (userSubscription.outgoing.length === 0) {
      return [];
    }

    return [...userSubscription.outgoing].sort((a, b) => {
      const aPerUnitFlowRate =
        BigInt(a.beamPool?.flowRate) / BigInt(a.beamPool?.totalUnits);
      const aBeamFlowRate = aPerUnitFlowRate * BigInt(a.units);

      const bPerUnitFlowRate =
        BigInt(b.beamPool?.flowRate) / BigInt(b.beamPool?.totalUnits);
      const bBeamFlowRate = bPerUnitFlowRate * BigInt(b.units);

      return bBeamFlowRate > aBeamFlowRate ? 1 : -1;
    });
  }, [userSubscription]);

  if (!userSubscription) {
    return <Text>No Subscription</Text>;
  }

  if (userSubscription && userSubscription.outgoing.length === 0)
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={true} />
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No outgoing streams
          </Text>
          <Text c={colors.gray[2]}>Interact With Posts to start beaming</Text>
        </Flex>
      </Stack>
    );

  return (
    <Stack gap="sm">
      <TableHeader sending={true} />

      <Stack gap="12px">
        {sorted.map((item) => {
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
              sending={true}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.to?.profile?.pfp_url || ''}
              avatarTooltip={
                item.to?.profile?.username
                  ? `@${item.to.profile.username}`
                  : undefined
              }
              avatarOnClick={
                item.to?.fid ? () => navigate(`/user/${item.to.fid}`) : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
