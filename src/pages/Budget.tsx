import {
  Box,
  Button,
  ComboboxData,
  ComboboxItem,
  ComboboxItemGroup,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { Bold } from '../components/typography';
import {
  formatBalance,
  formatUnitBalance,
  generateRandomAddress,
  truncateAddress,
} from '../utils/common';
import { useNavigate } from 'react-router-dom';
import { useOnboard } from '../hooks/useOnboard';
import { Tag } from '../components/Tag';
import { useUser } from '../hooks/useUser';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';

export const Budget = () => {
  const { user } = useUser();
  const { balance } = useOnboard();
  console.log('balance', balance);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { form } = useOnboard();
  const { address } = useAccount();

  if (!form) return null;

  console.log('address', address);

  const formattedBalance = balance ? formatUnitBalance(balance) : '0';

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
        defaultValue={address || undefined}
        data={user?.eth_addresses.map((addr) => ({
          label: truncateAddress(addr),
          value: addr,
          isPrimaryAddress:
            addr.toLocaleLowerCase() ===
            user?.primary_address?.toLocaleLowerCase(),
          isCurrentAddress:
            addr.toLocaleLowerCase() === address?.toLocaleLowerCase(),
        }))}
        mb={40}
        key={form.key('preferredAddress')}
        renderOption={(item: any) => {
          return (
            <Group gap={'sm'}>
              <Text>{item.option.label}</Text>
              {item.option.isPrimaryAddress && (
                <Tag c="var(--mantine-color-gray-0)" fw={500}>
                  Primary Address
                </Tag>
              )}
              {item.option.isCurrentAddress && (
                <Tag c="var(--mantine-color-gray-0)" fw={500}>
                  Connected
                </Tag>
              )}
            </Group>
          );
        }}
        {...form.getInputProps('preferredAddress')}
      />
      <Stack align="center" gap={2} mb={48}>
        <Group gap="sm" align="end">
          <Text fz={36}>{formattedBalance}</Text>
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
        {/* <Tooltip label={'Net flow rate (incoming + outgoing) '}>
          <Text c={theme.colors.purple[6]}>-25,293.29 BEAMR/mo</Text>
        </Tooltip> */}
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
          description={`Your current balance is ${formattedBalance}`}
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
