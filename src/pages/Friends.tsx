import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useOnboard } from '../hooks/useOnboard';
import { Search } from 'lucide-react';
import cometImg from '../assets/comet.png';
import { useMemo, useState } from 'react';
import checkStyles from '../styles/checkbox.module.css';
import { useDisclosure } from '@mantine/hooks';
import { AppModal } from '../components/AppModal';
import { useNavigate } from 'react-router-dom';

export const Friends = () => {
  const { budget, following, form, handlePoolCreate, selectedFriends } =
    useOnboard();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredFriends = useMemo(() => {
    if (!following) return [];

    const query = filter.toLowerCase();
    return following
      .filter(
        (friend) =>
          friend.user.username.toLowerCase().includes(query) ||
          friend.user.display_name?.toLowerCase().includes(query)
      )
      .map((friend) => ({ ...friend, checked: false }));
  }, [following, filter]);

  const hasSelected3 =
    (selectedFriends && selectedFriends?.length >= 3) || false;

  return (
    <Box>
      <Group justify="center" mb={24}>
        <Group align="end">
          <Text fz={36}>{budget}/mo</Text>
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
      </Group>
      <Text mb={'xl'}>Seed your Beamr with 3 of your favorite Casters</Text>
      <Text variant="label" mb="md">
        Select 3+ Casters to start Beamin!
      </Text>
      <TextInput
        leftSection={<Search size={20} />}
        mb="sm"
        placeholder="Search by username or display name"
        onChange={handleSearch}
      />
      <ScrollArea h={290}>
        <Checkbox.Group
          value={selectedFriends}
          onChange={(value) => {
            form?.setFieldValue('selectedFriends', value);
          }}
        >
          <Stack gap="sm">
            {filteredFriends.map((friend) => {
              return (
                <Checkbox.Card
                  key={friend.user.fid}
                  value={
                    friend.user.verified_addresses.primary.eth_address as string
                  }
                  classNames={{
                    card: checkStyles.card,
                  }}
                >
                  <Group p={4}>
                    <Checkbox.Indicator />
                    <Group gap={8}>
                      <Avatar src={friend.user.pfp_url} size={36} />
                      <Box>
                        <Text fz="sm">{friend.user.display_name}</Text>
                        <Text fz="sm" c="dim">
                          @{friend.user.username}
                        </Text>
                      </Box>
                    </Group>
                  </Group>
                </Checkbox.Card>
              );
            })}
          </Stack>
        </Checkbox.Group>
      </ScrollArea>
      <Button
        size="lg"
        mt="xl"
        onClick={() => {
          handlePoolCreate?.();
          navigate('/create-pool/4', { viewTransition: true });
        }}
        disabled={!hasSelected3}
      >
        Create
      </Button>
      <AppModal
        opened={opened}
        onClose={close}
        title="Congrats!"
        description="You're all set! "
      >
        <Image src={cometImg} height={90} width={90} fit="contain" />
      </AppModal>
    </Box>
  );
};
