import {
  Alert,
  Box,
  Drawer,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { getTipLimit, getUserSubs } from '../../utils/api';
import { ReceiptStatus } from '../../validation/receipts';
import { AlertCircle, Info } from 'lucide-react';
import { Glass } from '../Glass';
import classes from '../../styles/effects.module.css';
import modalClasses from '../../styles/modal.module.css';
import { InteractionCard } from './InteractionCard';

export const ActivityDrawer = () => {
  const { colors } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { user, getAuthHeaders } = useUser();

  const {
    data: tipLimit,
    error: tipLimitError,
    isLoading: tipLimitLoading,
  } = useQuery({
    queryKey: [`tip-limit`, user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();

      if (!headers) return;

      return getTipLimit(headers);
    },
    enabled: !!user?.fid,
  });

  const {
    data: recentSubs,
    isLoading: recentSubLoading,
    error: recentSubError,
  } = useQuery({
    queryKey: ['recent-subs', user?.fid],
    queryFn: async () => {
      const headers = await getAuthHeaders();
      if (!headers) return null;

      return await getUserSubs(headers);
    },
    refetchInterval: 1000,
    enabled: !!user?.fid,
  });

  const limited =
    !!tipLimit && tipLimit?.limited && !tipLimitLoading && !tipLimitError;
  const remaining = tipLimit?.remaining || 0;

  const pending = recentSubs?.filter(
    (sub) => sub.status === ReceiptStatus.Posted
  );

  const resolved = recentSubs?.filter(
    (sub) =>
      sub.status === ReceiptStatus.Completed ||
      sub.status === ReceiptStatus.OnchainFail
  );

  const hasPending = pending && pending.length > 0;

  if (recentSubLoading || !recentSubs || recentSubError) {
    return null;
  }

  return (
    <Box>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content className={modalClasses.content}>
          <Box>
            <Drawer.Header className={modalClasses.header}>
              <Drawer.Title fz={'lg'} fw={500} c={colors.gray[0]}>
                Recent Activity
              </Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>
          </Box>
          {limited && (
            <Alert
              color="yellow"
              m="sm"
              title="Rate Limit Exceeded"
              icon={<Info size={16} />}
            >
              Microsub pools get a daily limit of 50 interactions. The limit
              resets on a rolling 24-hour basis.
            </Alert>
          )}
          <Drawer.Body>
            {hasPending ? (
              <>
                <Text mb="md" c={colors.gray[2]} fs="italic">
                  Pending (Last 90m)
                </Text>
                <Stack gap="sm" mb="xl">
                  {pending
                    ?.sort(
                      (a, b) =>
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    )
                    .map((sub) => {
                      return <InteractionCard receipt={sub} />;
                    })}
                </Stack>{' '}
              </>
            ) : null}
            {resolved && resolved.length > 0 ? (
              <>
                <Text mb="md" c={colors.gray[2]} fs="italic">
                  Resolved (Last 90m)
                </Text>
                <Stack gap="sm">
                  {resolved
                    ?.sort(
                      (a, b) =>
                        new Date(b.updatedAt).getTime() -
                        new Date(a.updatedAt).getTime()
                    )
                    ?.map((sub) => {
                      return <InteractionCard receipt={sub} />;
                    })}
                </Stack>
              </>
            ) : null}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      {hasPending && (
        <Glass py={4} px={10} onClick={open} style={{ cursor: 'pointer' }}>
          <Group wrap="nowrap" gap={8}>
            <Loader size={16} color={colors.gray[3]} />
            <Text>+{pending?.length} Pending</Text>
            {limited && (
              <Tooltip
                multiline
                label={
                  <Box>
                    <Text fz="sm" mb="xs">
                      You have extended your daily tip limit ({remaining}/50)
                    </Text>
                  </Box>
                }
              >
                <AlertCircle
                  size={20}
                  color={colors.yellow[7]}
                  className={classes.glow}
                />
              </Tooltip>
            )}
          </Group>
        </Glass>
      )}

      {!hasPending && limited && (
        <Tooltip
          multiline
          label={
            <Box>
              <Text fz="sm" mb="xs">
                You have extended your daily tip limit ({remaining}/50)
              </Text>
            </Box>
          }
        >
          <Glass
            onClick={open}
            px={'sm'}
            py="xs"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <AlertCircle
              size={20}
              color={colors.yellow[7]}
              className={classes.glow}
            />
          </Glass>
        </Tooltip>
      )}
    </Box>
  );
};
