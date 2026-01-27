import {
  Avatar,
  Box,
  Drawer,
  Group,
  Loader,
  Text,
  Paper,
  Tooltip,
  useMantineTheme,
  Stack,
  AvatarGroup,
} from '@mantine/core';
import { useAccount } from 'wagmi';
import { useUser } from '../hooks/useUser';
import { ConnectionIndicator } from './ConnectionIndicator';
import { useQuery } from '@tanstack/react-query';
import { getTipLimit, getUserSubs } from '../utils/api';
import { Glass } from './Glass';
import {
  AlertCircle,
  Check,
  CircleQuestionMark,
  ExternalLink,
  Heart,
  MessageSquareReply,
  RefreshCcw,
  Users,
  X,
} from 'lucide-react';
import classes from '../styles/effects.module.css';
import { useDisclosure } from '@mantine/hooks';
import modalClasses from '../styles/modal.module.css';
import { BeamReceipt, ReceiptStatus } from '../validation/receipts';
import { timeAgo } from '../utils/common';
import sdk from '@farcaster/miniapp-sdk';
import { SCAN_URL } from '../const/addresses';

export const Header = () => {
  const { address } = useAccount();

  const { user } = useUser();

  const pfp = user?.pfp_url || `https://effigy.im/a/${address}.svg`;

  return (
    <Box w="100%">
      <Group w="100%" justify="space-between">
        <MainIndicator />
        <Box pos={'relative'} ml="auto">
          <Avatar src={pfp} size="32" />
          <ConnectionIndicator />
        </Box>
      </Group>
    </Box>
  );
};

const MainIndicator = () => {
  const { colors } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { user, getAuthHeaders } = useUser();

  console.log('classes', classes);
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

  return (
    <Box>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content className={modalClasses.content}>
          <Drawer.Header className={modalClasses.header}>
            <Drawer.Title fz={'lg'} fw={500} c={colors.gray[0]}>
              Recent Interactions
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            {pending && pending?.length > 0 ? (
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

      {pending && pending.length > 0 && (
        <Glass py={4} px={10} onClick={open} style={{ cursor: 'pointer' }}>
          <Group wrap="nowrap" gap={8}>
            <Loader size={16} color={colors.gray[3]} />
            <Text>+{pending?.length} Pending</Text>
          </Group>
        </Glass>
      )}

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

const getIconByStatus = (status: ReceiptStatus) => {
  if (status === ReceiptStatus.Completed) {
    return <Check size={16} color="green" />;
  }
  if (status === ReceiptStatus.OnchainFail) {
    return <X size={16} color="red" />;
  }
  if (status === ReceiptStatus.Posted) {
    return <Loader size={16} color={'var(--mantine-color-gray-3)'} />;
  }
  if (status === ReceiptStatus.Pending) {
    return <CircleQuestionMark size={16} color="gray" />;
  }

  if (status === ReceiptStatus.Failed) {
    return <X size={16} color="red" />;
  }

  return <CircleQuestionMark size={16} color="gray" />;
};

const getInteractionIcon = (receipt: BeamReceipt) => {
  if (receipt.id.includes('like')) {
    return (
      <Heart
        size={16}
        color="var(--mantine-color-red-7)"
        fill="var(--mantine-color-red-7)"
      />
    );
  }
  if (receipt.id.includes('recast')) {
    return <RefreshCcw size={12} color="var(--mantine-color-green-7)" />;
  }
  if (receipt.id.includes('follow')) {
    return <Users size={12} color="var(--mantine-color-purple-7)" />;
  }
  if (receipt.id.includes('comment')) {
    return (
      <MessageSquareReply size={12} color="var(--mantine-color-purple-7)" />
    );
  }
};

const extractCastHash = (receipt: BeamReceipt) => {
  if (receipt.id.includes('follow')) {
    return null;
  }
  const parts = receipt.id.split('_');
  return parts[parts.length - 1];
};

const InteractionCard = ({ receipt }: { receipt: BeamReceipt }) => {
  const { colors } = useMantineTheme();

  const castHash = extractCastHash(receipt);

  const viewCast = (hash: string | null) => {
    if (!hash) return;
    sdk.actions.viewCast({ hash });
  };

  const viewTransaction = (txHash: string | null) => {
    if (!txHash) return;

    sdk.actions.openUrl(`${SCAN_URL}/tx/${txHash}`);
  };

  return (
    <Paper>
      <Group w="100%" wrap="nowrap">
        <Group align="start">
          <Box h={50}>{getIconByStatus(ReceiptStatus.Posted)}</Box>
        </Group>
        <Box w={'100%'}>
          <Group w={'100%'}>
            <AvatarGroup>
              <Avatar
                src={receipt.senderProfile?.pfp_url || undefined}
                size={32}
              />
              <Avatar
                src={receipt.recipientProfile?.pfp_url || undefined}
                size={32}
              />
              <Avatar size={16}>{getInteractionIcon(receipt)}</Avatar>
            </AvatarGroup>

            <Text>{receipt.params?.amount} Shares </Text>
            <Text fz="sm" ml="auto">
              {timeAgo(receipt.updatedAt)} ago
            </Text>
          </Group>
          <Group mt="sm">
            {castHash ? (
              <Text
                fz="sm"
                td="underline"
                style={{ cursor: 'pointer' }}
                onClick={() => viewCast(castHash)}
              >
                Cast
              </Text>
            ) : (
              <Tooltip label="No casts for this interaction type">
                <Text
                  fz="sm"
                  style={{ cursor: 'not-allowed' }}
                  c={colors.gray[4]}
                >
                  Cast
                </Text>
              </Tooltip>
            )}
            {receipt.txHash ? (
              <Group
                td="underline"
                style={{ cursor: 'pointer' }}
                gap={4}
                onClick={() => viewTransaction(receipt.txHash)}
              >
                <Text fz="sm">Transaction</Text>
                <ExternalLink size={12} />
              </Group>
            ) : (
              <Tooltip label="Transaction has not been submitted yet">
                <Text
                  fz="sm"
                  style={{ cursor: 'not-allowed' }}
                  c={colors.gray[4]}
                >
                  Transaction
                </Text>
              </Tooltip>
            )}
          </Group>
        </Box>
      </Group>
    </Paper>
  );
};
