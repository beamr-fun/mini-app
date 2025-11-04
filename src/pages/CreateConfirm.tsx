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
import { CheckCheck } from 'lucide-react';
import { useCTA } from '../hooks/useCTA';
import sdk from '@farcaster/miniapp-sdk';

export const CreateConfirm = () => {
  const { creationSteps } = useOnboard();
  const navigate = useNavigate();
  const { colors } = useMantineTheme();

  const allStepsComplete = Object.values(creationSteps).every((step) => step);

  useCTA({
    label: 'Start Beaming',
    onClick: () => {
      sdk.actions.composeCast({
        text: 'Just created my Beamr Tipping Pool!',
      });
    },
    // disabled: !allStepsComplete,
  });

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
            description={'Deploying your pool.'}
            complete={creationSteps.createPool}
          />
          <LoaderStep
            title={'Distributing Budget'}
            description={'Requesting funds from your wallet'}
            complete={creationSteps.distributeFlow}
          />
          <LoaderStep
            title={'Confirming Pool'}
            description={'Registering your pool with Beamr.'}
            complete={creationSteps.completePool}
          />
          <LoaderStep
            title={'Indexing'}
            description={'Discovering your pool onchain.'}
            complete={creationSteps.indexTransaction}
          />
        </Stack>
      </Card>
    </PageLayout>
  );
};

const LoaderStep = ({
  complete,
  title,
  description,
}: {
  complete: boolean;
  title: string;
  description: string;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Group align="flex-start" gap="md" wrap="nowrap">
      {complete ? (
        <CheckCheck
          size={28}
          strokeWidth={2}
          style={{
            stroke: 'url(#beamr-gradient)',
            fill: 'none',
          }}
        />
      ) : (
        <Loader size={28} color={'var(--glass-thick)'} />
      )}
      <Box>
        <Text fz={'lg'} fw={500} mb={2}>
          {title}
        </Text>
        <Text c={colors.gray[3]}>{description}</Text>
      </Box>
    </Group>
  );
};
