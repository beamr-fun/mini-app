import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Progress,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useUser } from '../hooks/useUser';
import beamrLogo from '../assets/beamrLogo.png';
import beamrTokenLogo from '../assets/beamrTokenLogo.png';
import { BeamrNav } from '../components/svg/BeamrNav';
import { use, useMemo, useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
import { IconTransfer } from '../components/svg/IconTransfer';
import { TrendingUp } from 'lucide-react';
import {
  toFixedUsingString,
  useFlowingBalance,
  useSignificantFlowingDecimal,
} from '../hooks/useFlowingBalance';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

export const Home = () => {
  const [tab, setTab] = useState('Sending');

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
      <BalanceDisplay />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Sending', 'Receiving']}
          mb="md"
        />
        {tab === 'Sending' && <Sending />}
        {tab === 'Receiving' && <Receiving />}
      </Card>
    </PageLayout>
  );
};

const BalanceDisplay = () => {
  const { colors } = useMantineTheme();
  const { address } = useAccount();
  const { userSubscription, userBalance, userBalanceFetchedAt } = useUser();

  const totalIncomingFlowRate = useMemo(() => {
    if (!userSubscription?.incoming) {
      return 0n;
    }

    if (userSubscription.incoming.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.incoming.forEach((item) => {
      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);
      total += beamFlowRate;
    });

    return total;
  }, [userSubscription?.incoming]);

  const totalOutgoingFlowRate = useMemo(() => {
    if (!userSubscription?.outgoing) {
      return 0n;
    }

    if (userSubscription.outgoing.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.outgoing.forEach((item) => {
      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);
      total += beamFlowRate;
    });

    return total;
  }, [userSubscription?.outgoing]);

  const totalIncomingPerMonth = totalIncomingFlowRate
    ? flowratePerSecondToMonth(totalIncomingFlowRate)
    : 0n;

  const totalOutgoingPerMonth = totalOutgoingFlowRate
    ? flowratePerSecondToMonth(totalOutgoingFlowRate)
    : 0n;

  const moreIncomingThanOutgoing =
    totalIncomingFlowRate >= totalOutgoingFlowRate;

  const netFlowRate = moreIncomingThanOutgoing
    ? totalIncomingFlowRate - totalOutgoingFlowRate
    : totalOutgoingFlowRate - totalIncomingFlowRate;

  const percentageOfIncoming =
    totalIncomingFlowRate && totalOutgoingFlowRate
      ? Number(
          (totalIncomingFlowRate * 10000n) /
            (totalIncomingFlowRate + totalOutgoingFlowRate)
        ) / 100
      : 0;

  const netMonthly = flowratePerSecondToMonth(netFlowRate);

  const flowingBalance = useFlowingBalance(
    userBalance || 0n,
    userBalanceFetchedAt || new Date(),
    totalIncomingFlowRate - totalOutgoingFlowRate
  );

  console.log('address', address);

  const decimalPlaces = useSignificantFlowingDecimal(
    totalIncomingFlowRate - totalOutgoingFlowRate,
    40
  );

  return (
    <Card mb="md">
      <Group gap={2} c={colors.gray[3]} mb={'md'}>
        <BeamrNav size={18} />
        <Text mr={6}>Beamr</Text>
        <Text fw={500} fz={'lg'} c={colors.gray[0]} mr={'auto'}>
          {decimalPlaces !== undefined
            ? toFixedUsingString(formatEther(flowingBalance), decimalPlaces)
            : formatEther(flowingBalance)}
        </Text>
        <ActionIcon>
          <Group gap={6}>
            <IconTransfer />
            <Text
              fz="xs"
              style={{ transform: 'translateY(-1px)' }}
              c={colors.blue[5]}
            >
              Buy
            </Text>
          </Group>
        </ActionIcon>
      </Group>
      <Group
        c={moreIncomingThanOutgoing ? colors.green[7] : colors.purple[7]}
        gap={4}
        mb={'sm'}
      >
        <TrendingUp size={18} />
        <Text fz="sm">
          Net Rate {moreIncomingThanOutgoing ? '+' : '-'}
          {netMonthly}
        </Text>
      </Group>
      <Progress
        mb="xs"
        color={colors.green[7]}
        bg={colors.purple[7]}
        value={percentageOfIncoming}
      />
      <Group justify="space-between">
        <Text c={colors.green[7]} fz="sm">
          Incoming
        </Text>
        <Text c={colors.purple[7]} fz="sm">
          Outgoing
        </Text>
      </Group>
      <Group justify="space-between">
        <Text fz="sm">{totalIncomingPerMonth}</Text>
        <Text fz="sm">{totalOutgoingPerMonth}</Text>
      </Group>
    </Card>
  );
};

const Sending = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();

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
        {userSubscription.outgoing.map((item) => {
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
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.to?.profile?.pfp_url || ''}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const Receiving = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();

  if (!userSubscription) {
    return <Text>No Subscription</Text>;
  }

  if (userSubscription && userSubscription.incoming.length === 0)
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
              key={item.id}
              flowRate={beamFlowRate}
              percentage={percentage}
              pfpUrl={item.from?.profile?.pfp_url || ''}
            />
          );
        })}
      </Stack>
    </Stack>
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

const TableRow = ({
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

// const Inputs = () => {
//   return (
//     <Stack gap="xl">
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Select
//         </Text>
//         <Stack gap="md">
//           <Select
//             label="Base Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//           />
//           <Select
//             label="Error Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             error="This is an error"
//           />
//           <Select
//             label="With Description"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             description="This is a description"
//           />
//           <Select
//             label="Filled Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             defaultValue={'Vue'}
//           />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Number Input
//         </Text>
//         <Stack gap="md">
//           <NumberInput
//             label="Base Input"
//             rightSection={'BEAMR'}
//             rightSectionWidth={70}
//           />
//           <NumberInput
//             label="Input With Description"
//             rightSection={'BEAMR'}
//             rightSectionWidth={70}
//             description="This is a description"
//           />
//           <NumberInput
//             label="Input With Error"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             error="This is an error"
//           />
//           <NumberInput
//             label="Required Input"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             required
//           />
//           <NumberInput
//             label="Filled Input"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             value={12345.67}
//           />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Textarea
//         </Text>
//         <Stack gap="md">
//           <Textarea label="Base Input" placeholder="This is placeholder text" />
//           <Textarea
//             label="Input With Description"
//             placeholder="This is placeholder text"
//             description="This is a description"
//           />
//           <Textarea
//             label="Base Input Error"
//             placeholder="This is placeholder text"
//             error="This is an error message"
//           />
//           <Textarea
//             label="Required Input"
//             placeholder="This is placeholder text"
//             required
//           />
//           <Textarea label="Filled Input" value={'Filled Input'} />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Text Input
//         </Text>
//         <Stack gap="md">
//           <TextInput
//             label="Base Input"
//             placeholder="This is placeholder text"
//           />
//           <TextInput
//             label="Input With Description"
//             placeholder="This is placeholder text"
//             description="This is a description"
//           />

//           <TextInput
//             label="Base Input Error"
//             placeholder="This is placeholder text"
//             error="This is an error message"
//           />
//           <TextInput
//             label="Required Input"
//             placeholder="This is placeholder text"
//             required
//           />
//           <TextInput label="Filled Input" value={'Filled Input'} />
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };

// const Buttons = () => {
//   return (
//     <Stack>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Primary Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button size="lg">Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button>Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button size="sm">Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button size="xs">Primary</Button>
//           </Box>
//         </Stack>
//       </Box>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Secondary Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button variant="secondary" size="lg">
//               Secondary
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button variant="secondary">Secondary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button variant="secondary" size="sm">
//               Secondary
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button variant="secondary" size="xs">
//               Secondary
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Disabled Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button size="lg" disabled>
//               Disabled
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button disabled>Disabled</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button disabled size="sm">
//               Disabled
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button disabled size="xs">
//               Disabled
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };

// const OtherComponents = () => {
//   return (
//     <Paper>
//       <Text fz="xl" c="var(--mantine-color-gray-0)" mb="md">
//         Other Components
//       </Text>
//       <Stack>
//         <Box>
//           <Text>Action Icon</Text>
//           <ActionIcon>
//             <User size={24} />
//           </ActionIcon>
//         </Box>
//         <Box>
//           <Text mb="sm">Checkbox</Text>
//           <Checkbox
//             label="Checkbox Label"
//             description="This is a description"
//           />
//         </Box>
//       </Stack>
//     </Paper>
//   );
// };

// const Cards = () => {
//   return (
//     <Paper>
//       <Text fz="xl" c="var(--mantine-color-gray-0)" mb="md">
//         Card
//       </Text>
//       <Stack gap="md">
//         <Select
//           label="Base Input"
//           placeholder="Pick value"
//           data={['React', 'Angular', 'Vue', 'Svelte']}
//         />
//         <NumberInput
//           label="Required Input"
//           rightSection={'ETH'}
//           rightSectionWidth={50}
//           required
//         />
//         <TextInput label="Base Input" placeholder="This is placeholder text" />
//       </Stack>
//     </Paper>
//   );
// };
