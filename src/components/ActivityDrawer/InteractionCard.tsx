import {
  Avatar,
  AvatarGroup,
  Box,
  Group,
  Paper,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { BeamReceipt, ReceiptStatus } from '../../validation/receipts';
import sdk from '@farcaster/miniapp-sdk';
import { SCAN_URL } from '../../const/addresses';
import { timeAgo } from '../../utils/common';
import {
  Check,
  CircleQuestionMark,
  ExternalLink,
  Heart,
  Loader,
  MessageSquareReply,
  RefreshCcw,
  Users,
  X,
} from 'lucide-react';

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

export const InteractionCard = ({ receipt }: { receipt: BeamReceipt }) => {
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
