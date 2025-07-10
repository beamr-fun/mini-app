import '@mantine/core/styles.css';
import { Flex, Group, MantineProvider, Stack } from '@mantine/core';
import { theme } from './theme';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { useQueryClient } from '@tanstack/react-query';
import { useInputState } from '@mantine/hooks';
import { isAddress } from 'viem';
import { Login } from './components/Login';
import { ClientRoutes } from './Routes';

export default function App() {
  const [addressStr, setAddressStr] = useInputState('');
  const [amount, setAmount] = useInputState(0);
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const client = useQueryClient();

  // const { data, refetch } = useQuery({
  //   queryKey: ['members'],
  //   queryFn: async () => {
  //     const response = await fetch('http://localhost:3000/members');

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();

  //     return data.members;
  //   },
  // });

  // useEffect(() => {
  //   // const data = fetch('http://localhost:3000/test');

  //   console.log('Connecting to SSE...');
  //   const eventSource = new EventSource(' http://localhost:3000/stream');

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);

  //     console.log('data', data);

  //     setMessages((prevMessages: any) => data.data.likes || []);
  //   };
  // }, []);

  useEffect(() => {
    sdk.actions.ready();

    // setTimeout(() => {
    //   sdk.actions.addMiniApp();
    // }, 2000);
  }, []);

  const updateShares = async () => {
    try {
      if (!isAddress(addressStr)) {
        alert('Please provide a valid address');
        return;
      }

      if (!amount || isNaN(amount) || amount <= 0) {
        alert('Please provide a valid amount');
        return;
      }

      const response = await fetch(
        `http://localhost:3000/send/${addressStr}/${amount}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('Response data:', data);

      client.setQueryData(['members'], () => data.members);
    } catch (error) {
      console.error('Error updating shares:', error);
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Group justify="end">
        <Login />
      </Group>
      <Flex h="90vh" justify="center" align="center" p="md">
        <ClientRoutes />
      </Flex>
    </MantineProvider>
  );
}
{
  /* <Box>
            <Title fz="h2" mb="md">
              Members
            </Title>
            <Stack gap="md" mb="xl">
              {data?.map((member: any) => (
                <Group key={member.account}>
                  <Text>{truncateAddress(member.account)}</Text>
                  <Text>{member.units}</Text>
                </Group>
              ))}
            </Stack>
            <Button onClick={() => refetch()}>Refetch</Button>
          </Box> */
}
{
  /* <Stack>
            <Title fz="h2">Update Shares</Title>
            <TextInput
              placeholder="0x..."
              label="address"
              value={addressStr}
              onChange={setAddressStr}
            />
            <TextInput label="amount" value={amount} onChange={setAmount} />
            <Button onClick={updateShares} loading={isLoading}>
              Add Shares
            </Button>
          </Stack> */
}
