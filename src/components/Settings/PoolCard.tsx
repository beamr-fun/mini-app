import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Collapse,
  Group,
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

  const isWeightingOverMax = (type: keyof Weightings) => {
    const value = Number(weightingState[type]);
    return value > MAX_WEIGHTING;
  };

  const isAnyWeightingOverMax = useMemo(() => {
    return (
      isWeightingOverMax('like') ||
      isWeightingOverMax('recast') ||
      isWeightingOverMax('follow') ||
      isWeightingOverMax('comment')
    );
  }, [weightingState]);

  const isBelowMin =
    monthly !== '' && monthly !== '0' && BigInt(monthly) < MIN_POOL_AMT;

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
        leftSectionWidth={45}
        leftSection={<Avatar src={beamrTokenLogo} size={24} />}
        description={`Fees Included: 2.5% Team + 2.5% Burn`}
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
          disabled={isZero}
          onClick={() => {
            setMonthly('0');
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
            error={isWeightingOverMax('like') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={<RefreshCcw size={20} color={colors.green[7]} />}
            value={weightingState.recast}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('recast', e.target.value)}
            error={isWeightingOverMax('recast') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={<Users size={20} color={colors.purple[7]} />}
            value={weightingState.follow}
            disabled={loadingUpdate}
            onChange={(e) => handleChangeWeighting('follow', e.target.value)}
            error={isWeightingOverMax('follow') ? 'Max is 100' : undefined}
          />
          <TextInput
            leftSection={
              <MessageSquareReply size={20} color={colors.yellow[7]} />
            }
            disabled={loadingUpdate}
            value={weightingState.comment}
            onChange={(e) => handleChangeWeighting('comment', e.target.value)}
            error={isWeightingOverMax('comment') ? 'Max is 100' : undefined}
          />
        </Stack>
        <Button
          size="xs"
          mb={'sm'}
          disabled={prefsDiff || loadingUpdate || isAnyWeightingOverMax}
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
