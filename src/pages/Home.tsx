import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Modal,
  Progress,
  SegmentedControl,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useUser } from '../hooks/useUser';
import beamrLogo from '../assets/beamrLogo.png';
import { BeamrNav } from '../components/svg/BeamrNav';
import { useEffect, useMemo, useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
import { IconTransfer } from '../components/svg/IconTransfer';
import { CircleAlert, TrendingUp, Zap } from 'lucide-react';

import { DancingText } from '../components/DancingText';
import { TableHeader, TableRow } from '../components/Home/TableItems';
import { useDisclosure } from '@mantine/hooks';
import { SwapUI } from '../components/SwapUI';
import { useCTA } from '../hooks/useCTA';
import { Address, isAddress } from 'viem';
import { multiConnect } from '../utils/interactions';
import { useAccount, useWalletClient } from 'wagmi';
import classes from '../styles/effects.module.css';
import { notifications } from '@mantine/notifications';

export const Home = () => {
  const [tab, setTab] = useState('Sending');
  const [opened, { open, close }] = useDisclosure(false);
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const [poolsToConnect, setPoolsToConnect] = useState<Address[]>([]);

  const { setCTA } = useCTA();

  const handleConnectStage = (poolId: string) => {
    if (!address || !walletClient) return;

    let newPools = [...poolsToConnect];

    if (poolId === undefined) return;

    if (!isAddress(poolId)) return;

    if (poolsToConnect.includes(poolId)) {
      newPools = newPools.filter((id) => id !== poolId);
    } else {
      newPools.push(poolId);
    }

    if (newPools.length === 0) {
      setCTA(null);
    } else {
      setCTA({
        label: `Connect to ${newPools.length} Pool${newPools.length + 1 > 1 ? 's' : ''}`,
        onClick: () => {
          setIsLoadingConnect(true);
          multiConnect({
            poolIds: newPools,
            walletClient,
            userAddress: address,
            onLoading: () => {
              setCTA({
                label: 'Connecting...',
                onClick: () => {},
                disabled: true,
              });
            },
            onSuccess: () => {
              setIsLoadingConnect(false);
              setCTA(null);
              setPoolsToConnect([]);
            },
            onError: (errMsg: string) => {
              setIsLoadingConnect(false);
              setCTA(null);
              setPoolsToConnect([]);
              notifications.show({
                title: 'Error',
                message: errMsg || 'Failed to connect to pools.',
                color: 'red',
              });
            },
          });
        },
      });
    }

    setPoolsToConnect(newPools);
  };

  useEffect(() => {
    return () => {
      setCTA(null);
    };
  }, []);

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

      <SwapModal opened={opened} onClose={close} />
      <BalanceDisplay openSwap={open} setTab={setTab} />
      <Card>
        <SegmentedControl
          w="100%"
          value={tab}
          onChange={setTab}
          data={['Sending', 'Receiving']}
          mb="md"
        />
        {tab === 'Sending' && <Sending />}
        {tab === 'Receiving' && (
          <Receiving
            onConnectClick={handleConnectStage}
            poolsToConnect={poolsToConnect}
            isLoadingConnect={isLoadingConnect}
          />
        )}
      </Card>
    </PageLayout>
  );
};

const BalanceDisplay = ({
  openSwap,
  setTab,
}: {
  openSwap: () => void;
  setTab: (tab: string) => void;
}) => {
  const { colors } = useMantineTheme();
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

  const amtConnected = useMemo(() => {
    if (!userSubscription) {
      return 0;
    }

    let total = 0;

    userSubscription.incoming.forEach((item) => {
      if (item.isReceiverConnected) {
        total += 1;
      }
    });
    return total;
  }, [userSubscription]);

  const hasUnconnected =
    amtConnected < (userSubscription?.incoming.length || 0);

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

  return (
    <Card mb="md">
      <Group gap={2} c={colors.gray[3]} mb={'md'}>
        <BeamrNav size={18} />
        <Text mr={6}>Beamr</Text>
        <DancingText
          userBalance={userBalance || 0n}
          fetchedAt={userBalanceFetchedAt || new Date()}
          flowRate={totalIncomingFlowRate - totalOutgoingFlowRate}
          fw={500}
          fz={'lg'}
          c={colors.gray[0]}
          mr={'auto'}
        />

        <ActionIcon onClick={openSwap}>
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
      <Group gap={'xs'} mt="md" justify="space-between">
        <Tooltip
          w={300}
          multiline
          label="Connect to Beams in order to stream to your wallet."
        >
          <Group
            gap={4}
            className={hasUnconnected ? classes.glow : undefined}
            onClick={() => setTab('Receiving')}
            style={{
              cursor: 'pointer',
            }}
          >
            {hasUnconnected && (
              <CircleAlert
                size={14}
                style={{ transform: 'translateY(-1px)' }}
              />
            )}
            <Text
              fz="sm"
              td="underline"
              c={hasUnconnected ? colors.gray[0] : colors.gray[3]}
            >
              {hasUnconnected ? 'Unconnected streams.' : 'All connected'}
            </Text>
          </Group>
        </Tooltip>
        <Tooltip
          w={250}
          multiline
          label={`Max 250 connections per user. You are connected to ${amtConnected} beams.`}
        >
          <Group gap={4}>
            <Text fz="sm">{amtConnected}/250</Text>
            <Zap
              size={16}
              color={colors.gray[3]}
              style={{
                transform: 'translateY(-1px)',
              }}
            />
          </Group>
        </Tooltip>
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
              sending={true}
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

const Receiving = ({
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

const SwapModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Modal.Root opened={opened} onClose={onClose} fullScreen bg="black">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Box mb={24}>
            <Text fz={'xl'} fw={500} mb={4} c={colors.gray[0]}>
              Swap Tokens
            </Text>
            <Text>Add Beamr to your account to unlock full access</Text>
          </Box>
          <SwapUI
            token1={{
              balance: '1000',
              unit: 'ETH',
            }}
            token2={{
              balance: '0',
              unit: 'BEAMR',
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
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
