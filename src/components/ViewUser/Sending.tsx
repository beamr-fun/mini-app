import { Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserTransformed } from '../../transforms/user';
import { TableHeader, TableRow } from '../User/TableItems';
import { getBeamFlowRate } from './flowRates';

export const Sending = ({ data }: { data: UserTransformed }) => {
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const sorted = useMemo(() => {
    if (!data?.outgoing?.length) return [];

    return [...data.outgoing].sort((a, b) => {
      const aBeamFlowRate = getBeamFlowRate(a);
      const bBeamFlowRate = getBeamFlowRate(b);

      return bBeamFlowRate > aBeamFlowRate ? 1 : -1;
    });
  }, [data]);

  if (sorted.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={true} />
        <Flex justify="center" align="center" h={100} direction="column">
          <Text size="xl" mb="md">
            No outgoing streams
          </Text>
          <Text c={colors.gray[2]}>No outgoing beams for this user yet.</Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <TableHeader sending={true} />
      <Stack gap="12px">
        {sorted.map((item) => {
          const beamFlowRate = getBeamFlowRate(item);
          const percentage = Number(
            (
              (Number(item.units || 0) /
                Number(item.beamPool?.totalUnits || 1)) *
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
