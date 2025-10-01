import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { Bold } from '../components/typography';
import { generateRandomAddress, truncateAddress } from '../utils/common';
import { useNavigate } from 'react-router-dom';
import { useOnboard } from '../hooks/useOnboard';

const DUMMY_ADDRESSES = Array.from({ length: 5 }).map(() => {
  const address = generateRandomAddress();
  return {
    value: address,
    label: truncateAddress(address),
  };
});

export const Budget = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { form } = useOnboard();

  if (!form) return null;

  return (
    <Box>
      <Text mb="md">
        Select the wallet address you would like to starting Beaming with.{' '}
        <Bold>
          Once this address is set, you will not be able to change it.{' '}
        </Bold>
      </Text>
      <Select
        description="Address cannot be changed for now"
        label="Wallet Address"
        placeholder="0xb3amr..."
        data={DUMMY_ADDRESSES}
        mb={40}
        key={form.key('preferredAddress')}
        {...form.getInputProps('preferredAddress')}
      />
      <Stack align="center" gap={2} mb={48}>
        <Group gap="sm" align="end">
          <Text fz={36}>823.12k</Text>
          <Text
            fz={'sm'}
            variant="label"
            style={{
              transform: 'translateY(-9px)',
            }}
          >
            BEAMR
          </Text>
        </Group>
        <Tooltip label={'Net flow rate (incoming + outgoing) '}>
          <Text c={theme.colors.purple[6]}>-25,293.29 BEAMR/mo</Text>
        </Tooltip>
      </Stack>
      <Box mb={48}>
        <Text variant="label">Monthly Budget</Text>
        <Text c={theme.colors.gray[3]} fz={'sm'} mb={6}>
          Total amount beamed across all curated creators
        </Text>
        <NumberInput
          rightSection={'BEAMR'}
          rightSectionWidth={70}
          key={form.key('budget')}
          description={'Your current balance is 823.12k'}
          {...form.getInputProps('budget')}
        />
      </Box>
      <Button
        size="lg"
        onClick={() => navigate('/create-pool/3', { viewTransition: true })}
        disabled={!form.values.budget || !form.values.preferredAddress}
      >
        Next
      </Button>
    </Box>
  );
};
