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

export const CreateConfirm = () => {
  const { creationSteps } = useOnboard();

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
          <Stack gap="md" w="100%">
            <Button size="lg">Share</Button>
            <Button size="lg" variant="secondary">
              See Pool
            </Button>
          </Stack>
        ) : (
          <Loader />
        )}
      </Group>
    </Box>
  );
};
