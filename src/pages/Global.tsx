import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { PageLayout } from '../layouts/PageLayout';
import beamrLogo from '../assets/beamrLogo.png';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
import { useGqlSub } from '../hooks/useGqlSub';
import {
  GlobalMostRecentDocument,
  GlobalMostRecentSubscription,
} from '../generated/graphql';

type BeamsData = GlobalMostRecentSubscription['Beam'];

export const Global = () => {
  const [tab, setTab] = useState('Recent');

  const { data: recentRaw } = useGqlSub<GlobalMostRecentSubscription>(
    GlobalMostRecentDocument,
    {}
  );

  const recentBeams = recentRaw?.Beam || [];

  return (
    <PageLayout>
      <Image
        src={beamrLogo}
        alt="Beamr Logo"
        width={80}
        height={80}
        mb="xl"
        fit="contain"
      />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Recent', 'Leaderboard']}
          mb="md"
        />
        {tab === 'Recent' && <Recent beams={recentBeams} />}
      </Card>
    </PageLayout>
  );
};

const Recent = ({ beams }: { beams: BeamsData }) => {
  return (
    <Stack gap="sm">
      <GlobalHeader />
      <Stack gap="sm">
        {beams?.map((beam) => {
          const perUnitFlowRate =
            BigInt(beam.beamPool?.flowRate) / BigInt(beam.beamPool?.totalUnits);
          const beamFlowRate = perUnitFlowRate * BigInt(beam.units);

          const percentage = Number(
            (
              (Number(beam.units) / Number(beam.beamPool?.totalUnits)) *
              100
            ).toFixed(2)
          );

          return (
            <GlobalRow
              key={beam.id}
              flowRate={beamFlowRate}
              senderUrl={beam.from?.profile?.pfp_url || ''}
              receiverUrl={beam.to?.profile?.pfp_url || ''}
              percentage={percentage}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const GlobalRow = ({
  senderUrl,
  receiverUrl,
  flowRate,
  percentage,
}: {
  senderUrl: string;
  receiverUrl: string;
  flowRate: bigint;
  percentage: number;
}) => {
  return (
    <Group justify="space-between">
      <AvatarGroup>
        <Avatar size={32} radius="xl" src={senderUrl} />
        <Avatar size={32} radius="xl" src={receiverUrl} />
      </AvatarGroup>
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

const GlobalHeader = () => {
  const { colors } = useMantineTheme();

  return (
    <Group justify="space-between" c={colors.gray[0]} mb="12px">
      <Text w={32} fz="sm" fw={500} ta="left">
        Users
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
