import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { BeamrHeadline } from '../BeamrHeadline';
import { Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { UserX } from 'lucide-react';
import { formatUnitBalance, truncateAddress } from '../../utils/common';
import { BeamrNav } from '../svg/BeamrNav';
import { useUser } from '../../hooks/useUser';

export const NotPoolAddressDisplay = ({
  userPoolAddress,
}: {
  userPoolAddress: string | null;
}) => {
  const { colors } = useMantineTheme();
  const { userBalance } = useUser();
  return (
    <PageLayout>
      <BeamrHeadline />
      <Stack>
        <Paper>
          <Stack align="center" gap="sm">
            <UserX size={60} strokeWidth={1.5} />
            <Text fz={'lg'} mt="md" fw={500}>
              Re-connect to your main account
            </Text>
            <Text c={colors.gray[3]} ta="center">
              Your main account is {truncateAddress(userPoolAddress || '')}.
              Please re-connect to this account. (Usually requires refresh)
            </Text>
          </Stack>
        </Paper>
        <Paper p={'md'}>
          <Group gap={2} c={colors.gray[3]}>
            <BeamrNav size={18} />
            <Text mr={6}>Beamr</Text>
            <Text fw={500} fz={'lg'} c={colors.gray[0]} mr={'auto'}>
              {userBalance ? formatUnitBalance(userBalance, 18, 4) : '0'}
            </Text>
          </Group>
        </Paper>
      </Stack>
    </PageLayout>
  );
};

export const NotPrimaryDisplay = ({
  primaryAddress,
}: {
  primaryAddress: string | null;
}) => {
  const { colors } = useMantineTheme();
  const { userBalance } = useUser();
  return (
    <PageLayout>
      <BeamrHeadline />
      <Stack>
        <Paper>
          <Stack align="center" gap="sm">
            <UserX size={60} strokeWidth={1.5} />
            <Text fz={'lg'} mt="md" fw={500}>
              Re-connect to your primary address
            </Text>
            <Text c={colors.gray[3]} ta="center">
              Your primary account is {truncateAddress(primaryAddress || '')}.
              Please re-connect to this account. (Usually requires refresh)
            </Text>
          </Stack>
        </Paper>
        <Paper p={'md'}>
          <Group gap={2} c={colors.gray[3]}>
            <BeamrNav size={18} />
            <Text mr={6}>Beamr</Text>
            <Text fw={500} fz={'lg'} c={colors.gray[0]} mr={'auto'}>
              {userBalance ? formatUnitBalance(userBalance, 18, 4) : '0'}
            </Text>
          </Group>
        </Paper>
      </Stack>
    </PageLayout>
  );
};
