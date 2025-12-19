import {
  Box,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useOnboard } from '../hooks/useOnboard';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../layouts/PageLayout';
import { CheckCheck, ChevronRight, InfoIcon } from 'lucide-react';
import { useCTA } from '../hooks/useCTA';

export const CreateConfirm = () => {
  const { creationSteps } = useOnboard();
  const { colors } = useMantineTheme();
  const { handleDistributeFlow } = useOnboard();
  const navigate = useNavigate();

  const allStepsComplete = Object.values(creationSteps).every((step) => step);

  const distributeReady =
    creationSteps.createPool &&
    !creationSteps.distributeFlow &&
    !creationSteps.completePool &&
    !creationSteps.indexTransaction;

  const awaitingCreate = Object.values(creationSteps).every((step) => !step);

  useCTA({
    label: awaitingCreate
      ? 'Creating Pool'
      : distributeReady
        ? 'Distribute Flow'
        : 'Start Beaming',
    onClick: distributeReady
      ? () => {
          handleDistributeFlow?.();
        }
      : () => {
          navigate('/home');
        },
    disabled: !distributeReady && !allStepsComplete,
  });

  const createDescription =
    creationSteps.createPool === 'loading'
      ? 'Creating your pool'
      : creationSteps.createPool === 'error'
        ? 'Pool creation failed. Please try again.'
        : 'Pool Created';

  const distributeDescription =
    creationSteps.distributeFlow === 'loading'
      ? 'Awaiting pool creation'
      : creationSteps.distributeFlow === 'requesting'
        ? 'Please initiate wallet transaction'
        : creationSteps.distributeFlow === 'error'
          ? 'Flow distribution failed. Please try again.'
          : 'Flow Distributed';

  const completeDescription =
    creationSteps.completePool === 'loading'
      ? 'Awaiting flow distribution'
      : creationSteps.completePool === 'error'
        ? 'Pool confirmation failed. Please try again.'
        : 'Pool Confirmed';

  const indexDescription =
    creationSteps.indexTransaction === 'loading'
      ? 'Awaiting pool confirmation'
      : creationSteps.indexTransaction === 'error'
        ? 'Indexing timed out. Pool still created successfully.'
        : 'Indexed Successfully';

  return (
    <PageLayout title="Complete">
      <Text mb="xs">Congrats! Your Beamr Tipping Pool is being created.</Text>
      <Text mb="lg" c={colors.gray[3]} fz="sm">
        The following steps should only take 5-30s
      </Text>
      <Card>
        <Stack mb="xl" gap="xl">
          <LoaderStep
            title={'Creating Pool'}
            description={createDescription}
            status={creationSteps.createPool}
          />
          <LoaderStep
            title={'Distributing Budget'}
            description={distributeDescription}
            status={creationSteps.distributeFlow}
          />
          <LoaderStep
            title={'Confirming Pool'}
            description={completeDescription}
            status={creationSteps.completePool}
          />
          <LoaderStep
            title={'Indexing'}
            description={indexDescription}
            status={creationSteps.indexTransaction}
          />
        </Stack>
      </Card>
    </PageLayout>
  );
};

const LoaderStep = ({
  status,
  title,
  description,
}: {
  status: 'loading' | 'error' | 'success' | 'requesting' | 'timeout';
  title: string;
  description: string;
}) => {
  const { colors } = useMantineTheme();

  const Icon =
    status === 'success' ? (
      <CheckCheck
        size={28}
        strokeWidth={2}
        style={{
          stroke: 'url(#beamr-gradient)',
          fill: 'none',
        }}
      />
    ) : status === 'requesting' ? (
      <ChevronRight
        size={28}
        strokeWidth={2}
        style={{
          stroke: 'url(#beamr-gradient)',
          fill: 'none',
        }}
      />
    ) : status === 'error' ? (
      <InfoIcon size={28} color={colors.red[5]} />
    ) : status === 'timeout' ? (
      <InfoIcon size={28} color={colors.yellow[5]} />
    ) : (
      <Loader size={28} color={'var(--glass-thick)'} />
    );

  return (
    <Group align="flex-start" gap="md" wrap="nowrap">
      {Icon}
      <Box>
        <Text fz={'lg'} fw={500} mb={2}>
          {title}
        </Text>
        <Text c={colors.gray[3]} mb="md">
          {description}
        </Text>
      </Box>
    </Group>
  );
};
