import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Collapse,
  Group,
  NumberFormatter,
  NumberInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useRef, useState } from 'react';
import { flowratePerSecondToMonth, formatBalance } from '../../utils/common';
import { Weightings } from '../../utils/api';
import beamrTokenLogo from '../../assets/beamrTokenLogo.png';
import { Tag } from '../Tag';
import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageSquareReply,
  PencilIcon,
  RefreshCcw,
  Users,
} from 'lucide-react';
import { MIN_POOL_AMT } from '../../const/params';

const MAX_WEIGHTING = 100;

export const PoolCard = ({
  flowRate,
  boostedFlowRate,
  totalOutgoingFlowRate,
  lastUpdated,
  name,
  weightings,
  updatePrefs,
  poolAddress,
  loadingUpdate,

  handleDistributeFlow,
}: {
  id: string;
  creatorAddress: string;

  weightings: {
    recast: string;
    like: string;
    comment: string;
    follow: string;
  };
  name: string;
  lastUpdated: string;
  poolAddress: string;
  flowRate: string;
  boostedFlowRate?: string;
  totalOutgoingFlowRate?: string;
  updatePrefs: (poolAddress: string, weightings: Weightings) => Promise<void>;
  loadingUpdate?: boolean;
  handleDistributeFlow: (poolAddress: string, monthly: string) => Promise<void>;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  const [weightingState, setWeightingState] = useState<Weightings>(weightings);
  const [monthly, setMonthly] = useState<string>(
    flowratePerSecondToMonth(BigInt(flowRate), 'rounded')
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const existingMonthly = flowratePerSecondToMonth(BigInt(flowRate), 'rounded');
  const totalOutgoingMonthly = flowratePerSecondToMonth(
    BigInt(totalOutgoingFlowRate || flowRate || 0),
    'rounded'
  );
  const boostedMonthly = flowratePerSecondToMonth(
    BigInt(boostedFlowRate || 0),
    'rounded'
  );
  const hasBoost = BigInt(boostedFlowRate || 0) > 0n;

  const handleChangeWeighting = (
    weightType: keyof Weightings,
    value: string
  ) => {
    setWeightingState((prev) => ({
      ...prev,
      [weightType]: value,
    }));
  };

  const prefsDiff =
    weightingState.like === weightings.like &&
    weightingState.recast === weightings.recast &&
    weightingState.comment === weightings.comment &&
    weightingState.follow === weightings.follow;

  const monthlyDiff = monthly === existingMonthly;

  const isZero = monthly === '0';

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const isBelowMin =
    monthly !== '' && monthly !== '0' && BigInt(monthly) < MIN_POOL_AMT;

  const isWeightingOverMax = (type: keyof Weightings) => {
    const value = Number(weightingState[type]);
    return value > MAX_WEIGHTING;
  };

  const isWeightingEmpty = (type: keyof Weightings) => {
    return weightingState[type] === '';
  };

  const isWeightingDecimal = (type: keyof Weightings) => {
    const value = weightingState[type];
    return value.includes('.');
  };

  const isWeightingNegative = (type: keyof Weightings) => {
    const value = Number(weightingState[type]);
    return value < 0;
  };

  const isWeightingNotNumber = (type: keyof Weightings) => {
    const value = weightingState[type];
    return isNaN(Number(value));
  };

  const isWeightingError = (type: keyof Weightings) => {
    return isWeightingOverMax(type)
      ? 'Max is 100'
      : isWeightingDecimal(type)
        ? 'No decimals'
        : isWeightingNegative(type)
          ? 'Cannot be negative'
          : isWeightingNotNumber(type)
            ? 'Must be a number'
            : isWeightingEmpty(type)
              ? 'Cannot be empty'
              : undefined;
  };

  const isAnyWeightingError = useMemo(() => {
    return (
      !!isWeightingError('like') ||
      !!isWeightingError('recast') ||
      !!isWeightingError('follow') ||
      !!isWeightingError('comment')
    );
  }, [weightingState]);

  return (
    <Card>
      <Group justify="space-between" mb={4}>
        <Text fw={500}>{name}</Text>
        <Tag bg={colors.blue[9]} c={colors.blue[3]} w="fit-content">
          Microsub Pool
        </Tag>
      </Group>
      <Text c={colors.gray[3]} fz="sm" mb="md">
        Last Updated: {new Date(lastUpdated).toLocaleDateString()}
      </Text>

      <NumberInput
        label="Monthly Budget"
        ref={inputRef}
        thousandSeparator
        valueIsNumericString
        allowDecimal={false}
        leftSectionWidth={45}
        leftSection={<Avatar src={beamrTokenLogo} size={24} />}
        description="Includes protocol fees."
        error={
          isBelowMin
            ? `Minimum monthly amount is ${formatBalance(MIN_POOL_AMT.toString())} BEAMR`
            : undefined
        }
        value={monthly}
        onChange={(val) => setMonthly(val.toString())}
        disabled={loadingUpdate}
        mb="md"
      />
      {hasBoost && (
        <Text fz="sm" c={colors.blue[4]} mt="-sm" mb={4}>
          Boosted +<NumberFormatter value={boostedMonthly} thousandSeparator />
        </Text>
      )}
      <Text fz="sm" c={colors.gray[3]} mb="md">
        Total Outgoing{' '}
        <NumberFormatter value={totalOutgoingMonthly} thousandSeparator />
      </Text>

      <Group gap="sm" mb="md">
        <Button
          size="xs"
          variant={monthlyDiff ? 'secondary' : undefined}
          disabled={loadingUpdate || isBelowMin}
          onClick={
            monthlyDiff
              ? () => focusInput()
              : () => handleDistributeFlow(poolAddress, monthly)
          }
          loading={loadingUpdate}
          leftSection={monthlyDiff ? <PencilIcon size={14} /> : undefined}
        >
          {monthlyDiff ? 'Adjust Flow' : 'Set Flow'}
        </Button>
        <Button
          size="xs"
          variant="danger"
          disabled={loadingUpdate || isZero}
          onClick={async () => {
            setMonthly('0');
            await handleDistributeFlow(poolAddress, '0');
          }}
        >
          Stop Flow
        </Button>
      </Group>

      <Collapse in={opened}>
        <Text mb={10} c={colors.gray[3]}>
          Shares Per Action
        </Text>
        <Stack gap="sm" mb="md">
          <TextInput
            leftSection={<Heart size={20} color={colors.red[7]} />}
            value={weightingState.like}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('like', e.target.value)}
            error={isWeightingError('like')}
          />
          <TextInput
            leftSection={<RefreshCcw size={20} color={colors.green[7]} />}
            value={weightingState.recast}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('recast', e.target.value)}
            error={isWeightingError('recast')}
          />
          <TextInput
            leftSection={<Users size={20} color={colors.purple[7]} />}
            value={weightingState.follow}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('follow', e.target.value)}
            error={isWeightingError('follow')}
          />
          <TextInput
            leftSection={
              <MessageSquareReply size={20} color={colors.yellow[7]} />
            }
            disabled={loadingUpdate}
            value={weightingState.comment}
            onChange={(e) => handleChangeWeighting('comment', e.target.value)}
            error={isWeightingError('comment')}
          />
        </Stack>
        <Button
          size="xs"
          mb={'sm'}
          disabled={prefsDiff || loadingUpdate || isAnyWeightingError}
          onClick={() => updatePrefs(poolAddress, weightingState)}
          loading={loadingUpdate}
        >
          Save
        </Button>
      </Collapse>
      <Group gap={4}>
        <Text c={colors.gray[3]} fz="sm">
          Prefs
        </Text>

        <ActionIcon size="xs" onClick={toggle}>
          {opened ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </ActionIcon>
      </Group>
    </Card>
  );
};
