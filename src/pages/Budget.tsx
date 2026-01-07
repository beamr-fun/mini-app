import {
  Box,
  Group,
  NumberInput,
  Paper,
  Image,
  Stack,
  Text,
  useMantineTheme,
  Button,
  Tooltip,
} from '@mantine/core';
import {
  charLimit,
  flowratePerSecondToMonth,
  formatBalance,
  formatUnitBalance,
  truncateAddress,
} from '../utils/common';
import { useNavigate } from 'react-router-dom';
import { useOnboard } from '../hooks/useOnboard';
import { useUser } from '../hooks/useUser';
import { useAccount, useWalletClient } from 'wagmi';
import { PageLayout } from '../layouts/PageLayout';
import { useCTA } from '../hooks/useCTA';
import { IconTransfer } from '../components/svg/IconTransfer';
import { useDisclosure } from '@mantine/hooks';
import beamrEcon from '../assets/beamrEcon.png';
import { Info, PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { multiConnect } from '../utils/interactions';
import { notifications } from '@mantine/notifications';
import { Address, parseUnits } from 'viem';
import { isTestnet } from '../utils/setup';
import { ADDR } from '../const/addresses';
import { MIN_POOL_AMT } from '../const/params';
import { SwapModal } from '../components/User/SwapModal';

export const Budget = () => {
  const navigate = useNavigate();
  const {
    budget,
    form,
    userClaimable,

    refetchClaimable,
  } = useOnboard();
  const { userSubscription, userBalance, refetchUserTokenData } = useUser();
  const { address } = useAccount();
  const { colors } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: walletClient } = useWalletClient();

  const [isLoading, setIsLoading] = useState(false);

  const isValidBudget = budget && BigInt(budget) >= MIN_POOL_AMT;

  useCTA({
    label: 'Set Budget',
    onClick: () => {
      navigate('/create-pool/3');
    },
    disabled: !isValidBudget || !budget || isLoading,
    // extraDeps: [budget, isValidBudget, isLoading],
  });

  if (!form) return null;

  const formattedBalance = userBalance ? formatUnitBalance(userBalance) : '0';

  const totalIncomingFlowRate = useMemo(() => {
    if (!userSubscription?.incoming) {
      return 0n;
    }

    if (userSubscription.incoming.length === 0) {
      return 0n;
    }

    let total = 0n;

    userSubscription.incoming.forEach((item) => {
      if (item.isReceiverConnected) return;

      const perUnitFlowRate =
        BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
      const beamFlowRate = perUnitFlowRate * BigInt(item.units);
      total += beamFlowRate;
    });

    return total;
  }, [userSubscription?.incoming]);

  const handleConnect = async () => {
    try {
      if (!walletClient) throw new Error('Wallet not connected');
      if (!address) throw new Error('Address not found');

      const beamrPoolIds =
        (userSubscription?.incoming
          .map((item) => item.beamPool?.id)
          .filter(Boolean) as Address[]) || [];

      const poolIds = isTestnet
        ? beamrPoolIds
        : [...beamrPoolIds, ADDR.PRE_BUY_POOL];

      multiConnect({
        poolIds,
        walletClient,
        userAddress: address,
        onLoading: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);

          notifications.show({
            title: 'Success',
            message: 'Connected to your pools successfully!',
            color: 'green',
          });

          setTimeout(() => {
            refetchClaimable?.();
            refetchUserTokenData?.();
          }, 2500);
        },
        onError: (errorMsg) => {
          setIsLoading(false);
          notifications.show({
            title: 'Error',
            message: charLimit(errorMsg, 56),
            color: 'red',
          });
        },
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: charLimit((error as Error).message, 56),
        color: 'red',
      });
    }
  };

  const hasIncomingFlow = totalIncomingFlowRate > 0n;
  const hasClaimable = userClaimable && userClaimable > 0n ? true : false;

  const totalIncomingPerMonth = totalIncomingFlowRate
    ? flowratePerSecondToMonth(totalIncomingFlowRate)
    : 0n;

  const isBalanceBelowMonthlySpend = () => {
    if (!form.values.budget || !isValidBudget) return false;
    if (!userBalance) return false;

    const budget = form.values.budget || '0';
    return userBalance < parseUnits(budget, 18);
  };

  return (
    <PageLayout title="Budget">
      <SwapModal opened={opened} onClose={close} />
      <Stack>
        <Paper>
          <Text mb={20}>
            Beamr requires users to set a fixed address, so their incoming
            streams can fund their outgoing streams in real-time.
          </Text>
          <Box w={299} h={236} mt="md">
            <Image
              src={beamrEcon}
              alt="Beamr Economy Diagram"
              w="100%"
              h="100%"
              fit="contain"
              bg={'var(--glass-light)'}
            />
          </Box>
        </Paper>
        <Paper>
          <Text fz={'xl'} c={colors.gray[0]} mb={2}>
            Beamr Wallet Selection
          </Text>
          <Text mb="md" c={colors.gray[3]}>
            Switch your connected wallet in the mini app menu now if you
            purchased or are receiving $BEAMR in another wallet.
          </Text>
          <Group gap={6} mb={34}>
            <Box
              bg="var(--glass-thick)"
              py={2}
              px={8}
              w={'fit-content'}
              style={{
                borderRadius: 10,
              }}
            >
              <Text c={colors.gray[3]}>Connected</Text>
            </Box>
            {address && <Text>{truncateAddress(address)}</Text>}
          </Group>
          <Text c={colors.gray[2]} ta="center" fw={500}>
            $BEAMR
          </Text>
          <Text fz={36} ta="center" mb={12}>
            {formattedBalance}
          </Text>
          {hasIncomingFlow && (
            <Text ta="center" mb={4}>
              <Text component="span" c={colors.green[6]} fw={500}>
                + {totalIncomingPerMonth}
              </Text>{' '}
              (pending connection)
            </Text>
          )}
          {hasClaimable && (
            <Text ta="center">
              <Text component="span" c={colors.green[6]} fw={500}>
                + Fair Launch Tokens
              </Text>{' '}
              (pending connection)
            </Text>
          )}
          <Group
            justify="center"
            mt={hasClaimable || hasIncomingFlow ? 30 : 16}
          >
            {(hasClaimable || hasIncomingFlow) && (
              <Button
                variant="inset"
                c={colors.green[7]}
                leftSection={<PlusIcon size={16} />}
                onClick={handleConnect}
                disabled={isLoading}
              >
                Connect
              </Button>
            )}
            <Button
              variant="inset"
              c={colors.blue[5]}
              leftSection={<IconTransfer size={14} />}
              onClick={open}
              disabled={isLoading}
            >
              Buy
            </Button>
          </Group>
        </Paper>
        <Paper>
          <Group gap="sm">
            <Text fz={'xl'} mb={2}>
              Budget
            </Text>
            <Tooltip label="">
              <Info size={16} color={colors.gray[4]} />
            </Tooltip>
          </Group>
          <Text fz={13} c={colors.gray[2]} mb={4}>
            Your monthly (30 days) $BEAMR stream.
          </Text>
          <NumberInput
            mb={2}
            thousandSeparator=","
            rightSection={<Text c={colors.gray[3]}>BEAMR/mo</Text>}
            rightSectionWidth={80}
            disabled={isLoading}
            key={form.key('budget')}
            {...form.getInputProps('budget')}
            onChange={(value) => {
              form.setFieldValue('budget', value.toString());
            }}
          />
          <Text
            fz={13}
            c={budget && !isValidBudget ? colors.red[7] : colors.gray[3]}
          >
            (Min. {formatBalance(MIN_POOL_AMT.toString())}/mo)
          </Text>
          <Group justify="space-between" wrap="nowrap" gap={0} mt={30}>
            <Button
              variant="panel"
              onClick={() => form.setFieldValue('budget', '10000000')}
              disabled={isLoading}
            >
              10M/mo
            </Button>
            <Button
              variant="panel"
              onClick={() => form.setFieldValue('budget', '25000000')}
              disabled={isLoading}
            >
              25M/mo
            </Button>
            <Button
              variant="panel"
              onClick={() => form.setFieldValue('budget', '100000000')}
              disabled={isLoading}
            >
              100M/mo
            </Button>
          </Group>
        </Paper>
        {isBalanceBelowMonthlySpend() && (
          <Text c={colors.yellow[7]} fz="sm">
            {
              'This proposed budget will deplete your token balance in < 1 month. Consider lowering your stream budget or buying more $BEAMR to keep your pool open longer.'
            }
          </Text>
        )}
      </Stack>
    </PageLayout>
  );
};
