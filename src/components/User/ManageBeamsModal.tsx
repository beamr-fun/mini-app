import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCallback, useMemo, useState } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { Address } from 'viem'; // needed for cast in handleRemoveBeams
import { useUser } from '../../hooks/useUser';
import { removeBeams } from '../../utils/interactions';
import { addToBlacklist } from '../../utils/api';
import { BeamRow } from './BeamRow';

export const ManageBeamsModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { colors } = useMantineTheme();
  const { userSubscription, user, getAuthHeaders } = useUser();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [removingAction, setRemovingAction] = useState<
    'remove' | 'exclude' | null
  >(null);

  const sorted = useMemo(() => {
    const outgoing = userSubscription?.outgoing ?? [];
    if (!outgoing.length) return [];
    return [...outgoing].sort((a, b) => {
      const aRate =
        (BigInt(a.beamPool?.flowRate) / BigInt(a.beamPool?.totalUnits)) *
        BigInt(a.units);
      const bRate =
        (BigInt(b.beamPool?.flowRate) / BigInt(b.beamPool?.totalUnits)) *
        BigInt(b.units);
      return bRate > aRate ? 1 : -1;
    });
  }, [userSubscription]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleClose = () => {
    setSelectedIds(new Set());
    onClose();
  };

  const handleRemoveBeams = async (exclude = false) => {
    if (!walletClient || !publicClient || !user?.fid) return;

    const selectedBeams = sorted
      .filter((item) => selectedIds.has(item.id))
      .map((item) => ({
        poolAddress: item.beamPool?.id as Address,
        memberAddress: item.id.split('_')[1] as Address,
        fidRoute: [user.fid, item.to.fid] as [number, number],
      }))
      .filter((b) => b.poolAddress && b.memberAddress);

    if (!selectedBeams.length) return;

    setRemovingAction(exclude ? 'exclude' : 'remove');
    await removeBeams({
      beams: selectedBeams,
      walletClient,
      publicClient,
      onSuccess: async () => {
        if (exclude) {
          try {
            const headers = await getAuthHeaders();
            if (headers) {
              const blacklistFids = selectedBeams.map((b) => b.fidRoute[1]);
              await addToBlacklist({ fid: user.fid, blacklistFids, headers });
            }
          } catch {
            notifications.show({
              title: 'Error',
              message: 'Beams removed but failed to exclude users.',
              color: 'yellow',
            });
          }
        }
        setRemovingAction(null);
        setTimeout(() => {
          setSelectedIds(new Set());
          notifications.show({
            title: exclude ? 'Beams removed & users excluded' : 'Beams removed',
            message: `${selectedBeams.length} beam${selectedBeams.length > 1 ? 's' : ''} removed${exclude ? ' and users excluded' : ''}.`,
            color: 'green',
          });
        }, 1500);
      },
      onError: (errMsg) => {
        setRemovingAction(null);
        notifications.show({
          title: 'Error',
          message: errMsg || 'Failed to remove beams.',
          color: 'red',
        });
      },
    });
  };

  const isRemoving = removingAction !== null;
  const hasSelection = selectedIds.size > 0;

  return (
    <Modal.Root opened={opened} onClose={handleClose} fullScreen>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text fz="xl" fw={500} c={colors.gray[0]}>
              Manage Beams
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Stack gap={0}>
            <Box
              px="md"
              py="sm"
              mb="xl"
              style={{
                background: 'var(--glass-pane)',
                border: '1px solid var(--glass-edge)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Text fz="xs" c={colors.gray[5]} mb="xs">
                {hasSelection
                  ? `${selectedIds.size} selected`
                  : 'Select beams to manage'}
              </Text>
              <Group gap="sm">
                <Button
                  variant="danger"
                  size="xs"
                  style={{ width: 'fit-content' }}
                  disabled={!hasSelection || isRemoving}
                  loading={removingAction === 'remove'}
                  onClick={() => handleRemoveBeams(false)}
                >
                  Remove beam
                </Button>
                <Button
                  variant="danger"
                  size="xs"
                  style={{ width: 'fit-content' }}
                  disabled={!hasSelection || isRemoving}
                  loading={removingAction === 'exclude'}
                  onClick={() => handleRemoveBeams(true)}
                >
                  Remove &amp; exclude
                </Button>
              </Group>
            </Box>

            <Group justify="space-between" c={colors.gray[4]} px={4} mb="sm">
              <Box w={20} />
              <Text w={32} fz="sm" fw={500}>
                To
              </Text>
              <Text w={32} fz="sm" fw={500}>
                Token
              </Text>
              <Text w={75} fz="sm" fw={500} ta="right">
                Amount/mo
              </Text>
              <Text w={48} fz="sm" fw={500} ta="right">
                Pool %
              </Text>
            </Group>

            <Divider mb="sm" />

            <ScrollArea h="calc(100dvh - 300px)" type="always">
              <Stack gap="12px">
                {sorted.map((item) => {
                  const perUnitFlowRate =
                    BigInt(item.beamPool?.flowRate) /
                    BigInt(item.beamPool?.totalUnits);
                  const beamFlowRate = perUnitFlowRate * BigInt(item.units);
                  const percentage = Number(
                    (
                      (Number(item.units) / Number(item.beamPool?.totalUnits)) *
                      100
                    ).toFixed(2),
                  );

                  return (
                    <BeamRow
                      key={item.id}
                      id={item.id}
                      pfpUrl={item.to?.profile?.pfp_url || ''}
                      beamFlowRate={beamFlowRate}
                      percentage={percentage}
                      isSelected={selectedIds.has(item.id)}
                      onToggle={toggleSelect}
                    />
                  );
                })}
              </Stack>
            </ScrollArea>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
