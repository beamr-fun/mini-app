import {
  Anchor,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../hooks/useUser';
import { TableHeader, TableRow } from './TableItems';
import { ManageBeamsModal } from './ManageBeamsModal';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

export const Sending = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [manageOpened, { open: openManage, close: closeManage }] =
    useDisclosure(false);

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
      <ManageBeamsModal opened={manageOpened} onClose={closeManage} />
      <Stack gap={4}>
        <Group justify="flex-end" mb={4} gap={4}>
          <Anchor
            component="button"
            fz="sm"
            c={colors.gray[5]}
            onClick={openManage}
          >
            Manage beams
          </Anchor>
          <Settings size={12} />
        </Group>
        <TableHeader sending={true} />
      </Stack>

      <Stack gap="12px">
        {sorted.map((item) => {
          const perUnitFlowRate =
            BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
          const beamFlowRate = perUnitFlowRate * BigInt(item.units);
          const percentage = Number(
            (
              (Number(item.units) / Number(item.beamPool?.totalUnits)) *
              100
            ).toFixed(2),
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
                item.to?.fid
                  ? () =>
                      navigate(`/user/${item.to.fid}`, {
                        state: { backTo: location.pathname + location.search },
                      })
                  : undefined
              }
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
