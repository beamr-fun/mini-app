import {
  Box,
  Button,
  Checkbox,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { useOnboard } from '../hooks/useOnboard';
import { useNavigate } from 'react-router-dom';

export const CreateConfirm = () => {
  const { creationSteps } = useOnboard();
  const navigate = useNavigate();

  return (
    <Box>
      <Text fz="sm" mb="lg">
        (Temporary UI)
      </Text>
      <Stack mb="xl">
        <Checkbox
          readOnly
          size="xl"
          checked={creationSteps.createPool}
          label="Beamr Created"
        />
        <Checkbox
          readOnly
          size="xl"
          checked={creationSteps.distributeFlow}
          label="Budget Distributed"
        />
        <Checkbox
          readOnly
          size="xl"
          checked={creationSteps.completePool}
          label="Confirmed"
        />
        <Checkbox
          readOnly
          size="xl"
          checked={creationSteps.indexTransaction}
          label="Indexed"
        />
      </Stack>
      <Group justify="center">
        {Object.values(creationSteps).every((step) => step) ? (
          <Button size="lg" onClick={() => navigate('/home')}>
            See Pool
          </Button>
        ) : (
          <Loader />
        )}
      </Group>
    </Box>
  );
};
