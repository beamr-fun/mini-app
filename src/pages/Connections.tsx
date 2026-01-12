import {
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useUser } from '../hooks/useUser';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';
import { flowratePerSecondToMonth } from '../utils/common';

export const Connections = () => {
  const { userSubscription } = useUser();

  if (!userSubscription) {
    return null;
  }
  return (
    <PageLayout title="Manage Connections">
      <Paper>
        <Stack gap="sm">
          <TableHeader sending={false} />
          <Stack gap="sm">
            {userSubscription.incoming.map((item) => {
              const perUnitFlowRate =
                BigInt(item.beamPool?.flowRate) /
                BigInt(item.beamPool?.totalUnits);
              const beamFlowRate = perUnitFlowRate * BigInt(item.units);
              const percentage = Number(
                (
                  (Number(item.units) / Number(item.beamPool?.totalUnits)) *
                  100
                ).toFixed(2)
              );
              return (
                <TableRow
                  key={item.id}
                  flowRate={beamFlowRate}
                  percentage={percentage}
                  pfpUrl={item.from?.profile?.pfp_url || ''}
                />
              );
            })}
          </Stack>
        </Stack>
      </Paper>
    </PageLayout>
  );
};

const TableHeader = ({ sending }: { sending: boolean }) => {
  const { colors } = useMantineTheme();
  return (
    <Group justify="space-between" c={colors.gray[0]} mb="12px">
      <Text w={32} fz="sm" fw={500} ta="left">
        {sending ? 'To' : 'From'}
      </Text>
      <Text w={32} fz="sm" fw={500} ta="left">
        Token
      </Text>
      <Text w={75} fz="sm" fw={500} ta="right">
        Amount/mo
      </Text>
      <Text w={48} fz="sm" fw={500} ta="right">
        Pool %
      </Text>
    </Group>
  );
};

export const TableRow = ({
  pfpUrl,
  flowRate,
  percentage,
}: {
  pfpUrl: string;
  flowRate: bigint;
  percentage: number;
}) => {
  return (
    <Group justify="space-between">
      <Avatar size={32} radius="xl" src={pfpUrl} />
      <Box w={32} ta="left">
        <Avatar src={beamrTokenLogo} size={24} />
      </Box>
      <Box w={75} ta="right">
        {flowratePerSecondToMonth(flowRate)}
      </Box>
      <Text w={48} ta="right">
        {percentage}%
      </Text>
    </Group>
  );
};
