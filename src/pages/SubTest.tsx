// import React from 'react';
// import { createClient } from 'graphql-ws';

import { Box, Button, Stack, Text } from '@mantine/core';
import { Address, WalletClient } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { useWalletClient } from 'wagmi';
import { BeamRABI } from '../abi/BeamR';
import { createClient } from 'graphql-ws';
import { useEffect, useState } from 'react';

// const subscription = {
//   query: `
//   subscription Test {
//   BeamR {
//     id
//     adminRole {
//       admins
//     }
//   }
// }`,
// };

// create a random address with Viem

const createRandomAddress = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  return account.address;
};

export const SubTest = () => {
  const walletClient = useWalletClient();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const subscription = {
      query: `
        subscription Test {
            BeamR {
    id
    adminRole {
      admins
    }
  }
}`,
    };

    const client = createClient({
      url: 'wss://indexer.dev.hyperindex.xyz/970509e/v1/graphql',
      connectionParams: {
        'x-hasura-admin-secret': 'testing',
      },
      // Debug logging
      on: {
        connected: () => console.log('✅ Connected'),
        error: (error) => console.error('❌ Error:', error),
        closed: (...rest) => {
          console.log('❌ Closed', ...rest);
          console.log('🔌 Disconnected');
        },
      },
    });

    const unsub = client.subscribe(subscription, {
      next: (result: any) => {
        console.log('result', result);
        setData(result.data?.BeamR?.[0]?.adminRole?.admins || []);
        // setError(null);
      },
      error: (err) => {
        // setError(err.message);
        console.error('Subscription error:', err);
      },
      complete: () => {
        console.log('Subscription completed');
      },
    });

    return () => {
      unsub();
    };
  }, []);

  const addRole = async () => {
    if (!walletClient?.data) {
      console.error('Wallet client is not available');
      return;
    }
    const address = createRandomAddress();

    console.log('Adding role for address:', address);

    const ROLE =
      '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775';

    walletClient.data.writeContract({
      abi: BeamRABI,
      address: '0xf8405d14CF994017015fd94Db54C9D0899FD465B',
      functionName: 'grantRole',
      args: [ROLE, address],
    });
  };

  console.log('data', data);

  return (
    <Box>
      <Button onClick={addRole} mb="xl">
        Add Admin
      </Button>

      <Stack>
        {data?.map((addr: Address) => (
          <Text fz="sm" key={addr}>
            {addr}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};
