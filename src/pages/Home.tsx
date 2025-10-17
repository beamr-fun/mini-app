import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  NumberInput,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Arrow } from '../components/Arrow';
import { PageLayout } from '../layouts/PageLayout';
import { useUser } from '../hooks/useUser';
import { Address, erc20Abi, isAddress, parseEther, parseEventLogs } from 'viem';
import { publicClient } from '../utils/connect';
import { BeamRABI } from '../abi/BeamR';
import { useConnect, useWalletClient } from 'wagmi';
import { ADDR } from '../const/addresses';

export const Home = () => {
  const { getAuthHeaders } = useUser();
  const { data: walletClient } = useWalletClient();
  const { connect, connectors } = useConnect();

  const test = async () => {
    // const schema = z.object({
    //   creatorAddress: z
    //     .string()
    //     .refine(isAddress, { message: 'Invalid creator address' })
    //     .transform((val) => val as Address),
    //   tokenAddress: z
    //     .string()
    //     .refine(isAddress, { message: 'Invalid token address' })
    //     .transform((val) => val as Address),
    //   fid: z.number().int().positive(),
    //   displayName: z.string().min(1, { message: 'Display name is required' }),
    //   flowRate: z.string(),
    //   selectedFriends: z.array(z.number().int().positive()),
    // });
    // const testData = {
    //   creatorAddress: '0xde6bcde54cf040088607199fc541f013ba53c21e',
    //   displayName: 'Jord',
    //   fid: 11650,
    //   flowRate: '1284722222222222',
    //   selectedFriends: [784795, 1147178, 1120999],
    //   tokenAddress: '0x19A30530209342cB2D94aD2693983A5cF7B77b79',
    // };
    // const validated = schema.safeParse(testData);
    // if (!validated.success) {
    //   console.error('Validation failed', validated.error);
    //   return;
    // }
    // const apiHeaders = await getAuthHeaders();
    // if (!apiHeaders) {
    //   console.error('No API headers');
    //   return;
    // }
    // const res = await fetch('http://localhost:3000/v1/pool/createPool', {
    //   method: 'POST',
    //   body: JSON.stringify(validated.data),
    //   headers: apiHeaders,
    // });
    // if (!res.ok) {
    //   const data = await res.json();
    //   console.error('Failed to create pool', data?.error || res.statusText);
    //   return;
    // }
    // const json = await res.json();
    // if (!json.hash) {
    //   console.error('No transaction hash in response', json);
    //   return;
    // }
    // const receipt = await publicClient.waitForTransactionReceipt({
    //   hash: json.hash,
    // });
    // const decoded = parseEventLogs({
    //   abi: BeamRABI,
    //   logs: receipt.logs,
    // });
    // if (receipt.status !== 'success') {
    //   console.error('Transaction failed', receipt);
    //   return;
    // }
    // console.log("SUCCESS! Here's the receipt:", receipt);
    // console.log('decoded', decoded);
  };

  return (
    <PageLayout>
      <Button size="lg" mb="xl" onClick={test}>
        TEST
      </Button>
    </PageLayout>
  );
};

const OrgChart = () => {
  return (
    <Box>
      <Text fz="xl" variant="highlight" mb="sm">
        Arrow Chart
      </Text>
      {/* 
      <Box pos="relative" h={300}>
        <Group>
          <Box>
          </Box>
          </Group> */}
      <Flex direction="column" align="center" mb="xl" gap={4}>
        <Avatar size={28} bg="red" />
        <Arrow />
        <Avatar size={28} bg="red" />
      </Flex>
      <Flex direction="column" align="center">
        <Avatar size={28} bg="red" />
        <Box style={{ transform: 'Rotate(-20deg)' }}>
          <Arrow />
        </Box>

        <Group>
          <Avatar size={28} bg="red" />
          <Avatar size={28} bg="red" />
        </Group>
      </Flex>
      {/* </Box> */}
    </Box>
  );
};

const Toggle = () => {
  return (
    <Box>
      <Text fz="xl" variant="highlight" mb="sm">
        Toggle
      </Text>

      <SegmentedControl data={['Recent', 'Leaderboard']} />
    </Box>
  );
};

const Inputs = () => {
  return (
    <Stack gap="xl">
      <Box>
        <Text fz="xl" variant="highlight" mb="sm">
          Select
        </Text>
        <Stack gap="md">
          <Select
            label="Base Input"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <Select
            label="Error Input"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            error="This is an error"
          />
          <Select
            label="With Description"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            description="This is a description"
          />
          <Select
            label="Filled Input"
            placeholder="Pick value"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            defaultValue={'Vue'}
          />
        </Stack>
      </Box>
      <Box>
        <Text fz="xl" variant="highlight" mb="sm">
          Number Input
        </Text>
        <Stack gap="md">
          <NumberInput
            label="Base Input"
            rightSection={'BEAMR'}
            rightSectionWidth={70}
          />
          <NumberInput
            label="Input With Description"
            rightSection={'BEAMR'}
            rightSectionWidth={70}
            description="This is a description"
          />
          <NumberInput
            label="Input With Error"
            rightSection={'ETH'}
            rightSectionWidth={50}
            error="This is an error"
          />
          <NumberInput
            label="Required Input"
            rightSection={'ETH'}
            rightSectionWidth={50}
            required
          />
          <NumberInput
            label="Filled Input"
            rightSection={'ETH'}
            rightSectionWidth={50}
            value={12345.67}
          />
        </Stack>
      </Box>
      <Box>
        <Text fz="xl" variant="highlight" mb="sm">
          Textarea
        </Text>
        <Stack gap="md">
          <Textarea label="Base Input" placeholder="This is placeholder text" />
          <Textarea
            label="Input With Description"
            placeholder="This is placeholder text"
            description="This is a description"
          />
          <Textarea
            label="Base Input Error"
            placeholder="This is placeholder text"
            error="This is an error message"
          />
          <Textarea
            label="Required Input"
            placeholder="This is placeholder text"
            required
          />
          <Textarea label="Filled Input" value={'Filled Input'} />
        </Stack>
      </Box>
      <Box>
        <Text fz="xl" variant="highlight" mb="sm">
          Text Input
        </Text>
        <Stack gap="md">
          <TextInput
            label="Base Input"
            placeholder="This is placeholder text"
          />
          <TextInput
            label="Input With Description"
            placeholder="This is placeholder text"
            description="This is a description"
          />

          <TextInput
            label="Base Input Error"
            placeholder="This is placeholder text"
            error="This is an error message"
          />
          <TextInput
            label="Required Input"
            placeholder="This is placeholder text"
            required
          />
          <TextInput label="Filled Input" value={'Filled Input'} />
        </Stack>
      </Box>
    </Stack>
  );
};

const Buttons = () => {
  return (
    <Stack>
      <Box mt="lg">
        <Text fz={'xl'} variant="highlight" mb="sm">
          Primary Button
        </Text>
        <Stack>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              L
            </Text>
            <Button size="lg">Primary</Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              M
            </Text>
            <Button>Primary</Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              S
            </Text>
            <Button size="sm">Primary</Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              XS
            </Text>
            <Button size="xs">Primary</Button>
          </Box>
        </Stack>
      </Box>
      <Box mt="lg">
        <Text fz={'xl'} variant="highlight" mb="sm">
          Secondary Button
        </Text>
        <Stack>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              L
            </Text>
            <Button variant="secondary" size="lg">
              Secondary
            </Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              M
            </Text>
            <Button variant="secondary">Secondary</Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              S
            </Text>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              XS
            </Text>
            <Button variant="secondary" size="xs">
              Secondary
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box mt="lg">
        <Text fz={'xl'} variant="highlight" mb="sm">
          Disabled Button
        </Text>
        <Stack>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              L
            </Text>
            <Button size="lg" disabled>
              Disabled
            </Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              M
            </Text>
            <Button disabled>Disabled</Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              S
            </Text>
            <Button disabled size="sm">
              Disabled
            </Button>
          </Box>
          <Box>
            <Text fz={30} variant="label" mb="sm">
              XS
            </Text>
            <Button disabled size="xs">
              Disabled
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
