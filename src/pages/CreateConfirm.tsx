import {
  Box,
  Button,
  Card,
  Checkbox,
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

export const CreateConfirm = () => {
  const { creationSteps } = useOnboard();
  const navigate = useNavigate();

  return (
    <PageLayout title="Complete">
      <Text fz="sm" mb="lg">
        (Temporary UI)
      </Text>
      <Card>
        <Stack mb="xl" gap="xl">
          <LoaderStep
            title={'Creating Pool'}
            description={'Deploying your pool.'}
            complete={false}
          />
          <LoaderStep
            title={'Distributing Budget'}
            description={'Requesting funds from your wallet'}
            complete={false}
          />
          <LoaderStep
            title={'Confirming Pool'}
            description={'Registering your pool with Beamr.'}
            complete={false}
          />
          <LoaderStep
            title={'Indexing'}
            description={'Discovering your pool onchain.'}
            complete={false}
          />
        </Stack>
      </Card>
      <Group justify="center">
        {Object.values(creationSteps).every((step) => step) ? (
          <Button size="lg" onClick={() => navigate('/home')}>
            See Pool
          </Button>
        ) : (
          <Loader />
        )}
      </Group>
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
