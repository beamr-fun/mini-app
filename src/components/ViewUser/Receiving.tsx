import { Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserTransformed } from '../../transforms/user';
import { TableHeader, TableRow } from '../User/TableItems';
import { getBeamFlowRate } from './flowRates';

export const Receiving = ({ data }: { data: UserTransformed }) => {
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const sorted = useMemo(() => {
    if (!data?.incoming?.length) return [];

    return [...data.incoming].sort((a, b) => {
      const aBeamFlowRate = getBeamFlowRate(a);
      const bBeamFlowRate = getBeamFlowRate(b);

      return bBeamFlowRate > aBeamFlowRate ? 1 : -1;
    });
  }, [data]);

  if (sorted.length === 0) {
    return (
      <Stack gap="sm" px="xs">
        <TableHeader sending={false} showConnection={false} />
        <Flex justify="center" align="center" h={100} direction="column">
          <Text size="xl" mb="md">
            No incoming streams
          </Text>
          <Text c={colors.gray[2]}>No one has beamed to this user yet.</Text>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack gap="sm">
      <TableHeader sending={false} showConnection={false} />
      <Stack gap="sm">
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
              sending={false}
              showConnection={false}
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.from?.profile?.pfp_url || ''}
              avatarTooltip={
                item.from?.profile?.username
                  ? `@${item.from.profile.username}`
                  : undefined
              }
              avatarOnClick={
                item.from?.fid
                  ? () =>
                      navigate(`/user/${item.from.fid}`, {
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
