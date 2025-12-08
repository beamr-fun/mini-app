import {
  ActionIcon,
  Box,
  Card,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Bold } from '../components/typography';
import { formatUnitBalance, truncateAddress } from '../utils/common';
import { useNavigate } from 'react-router-dom';
import { useOnboard } from '../hooks/useOnboard';
import { Tag } from '../components/Tag';
import { useUser } from '../hooks/useUser';
import { useAccount } from 'wagmi';
import { PageLayout } from '../layouts/PageLayout';
import { useCTA } from '../hooks/useCTA';
import { IconTransfer } from '../components/svg/IconTransfer';
import { useDisclosure } from '@mantine/hooks';
import { SwapUI } from '../components/SwapUI';

export const Budget = () => {
  const { user } = useUser();
  const { balance } = useOnboard();
  const navigate = useNavigate();
  const { form } = useOnboard();
  const { address } = useAccount();
  const { colors } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  useCTA({
    label: 'Set Budget',
    onClick: () => {
      navigate('/create-pool/3');
    },
    disabled: !form?.values.budget || !form?.values.preferredAddress,
  });

  if (!form) return null;

  const formattedBalance = balance ? formatUnitBalance(balance) : '0';

  return (
    <PageLayout title="Budget">
      <SwapModal opened={opened} onClose={close} />
      <Text mb="md">
        Select the wallet address you would like to starting Beaming with.{' '}
        <Bold>
          Once this address is set, you will not be able to change it.{' '}
        </Bold>
      </Text>
      <Card>
        <Select
          description="Address cannot be changed for now"
          label="Wallet Address"
          placeholder="0xb3amr..."
          defaultValue={address || undefined}
          data={user?.verified_addresses.eth_addresses.map((addr) => ({
            label: truncateAddress(addr),
            value: addr,
            isPrimaryAddress:
              addr.toLocaleLowerCase() ===
              user.verified_addresses.primary.eth_address?.toLocaleLowerCase(),
            isCurrentAddress:
              addr.toLocaleLowerCase() === address?.toLocaleLowerCase(),
          }))}
          mb={32}
          key={form.key('preferredAddress')}
          renderOption={(item: any) => {
            return (
              <Group gap={'sm'}>
                <Text>{item.option.label}</Text>
                {item.option.isPrimaryAddress && (
                  <Tag c="var(--mantine-color-gray-0)" fw={500}>
                    Primary
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
        <Stack align="center" gap={2} mb={40}>
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
          <ActionIcon onClick={open}>
            <Group gap={6}>
              <IconTransfer />
              <Text
                fz="xs"
                style={{ transform: 'translateY(-1px)' }}
                c={colors.blue[5]}
              >
                Buy
              </Text>
            </Group>
          </ActionIcon>
        </Stack>
        <Box>
          <NumberInput
            label="Monthly budget"
            thousandSeparator=","
            rightSection={'BEAMR'}
            rightSectionWidth={70}
            key={form.key('budget')}
            description={'The amount of Beamr you stream to others'}
            {...form.getInputProps('budget')}
          />
        </Box>
      </Card>
    </PageLayout>
  );
};

const SwapModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Modal.Root opened={opened} onClose={onClose} fullScreen bg="black">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Box mb={24}>
            <Text fz={'xl'} fw={500} mb={4} c={colors.gray[0]}>
              Swap Tokens
            </Text>
            <Text>Add Beamr to your account to unlock full access</Text>
          </Box>
          <SwapUI
            canSwap={false}
            token1={{
              balance: '1000',
              unit: 'ETH',
            }}
            token2={{
              balance: '0',
              unit: 'BEAMR',
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
