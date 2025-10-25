import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layouts/PageLayout';
import { useUser } from '../hooks/useUser';
import beamrLogo from '../assets/beamrLogo.png';
import { useState } from 'react';
import { flowratePerSecondToMonth } from '../utils/common';
import { useWalletClient } from 'wagmi';
import { ADDR } from '../const/addresses';
import { erc20Abi, parseEther } from 'viem';

export const Home = () => {
  const [tab, setTab] = useState('Sending');

  return (
    <PageLayout>
      <Group justify="center" mt="md" mb="lg">
        <Avatar src={beamrLogo} size={128} />
      </Group>
      <SegmentedControl
        value={tab}
        data={['Sending', 'Receiving']}
        onChange={setTab}
        mb="lg"
      />
      {tab === 'Sending' && <Sending />}
      {tab === 'Receiving' && <Receiving />}
    </PageLayout>
  );
};

const Sending = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();

  if (!userSubscription) {
    return <Text>No Subscription</Text>;
  }

  if (userSubscription && userSubscription.outgoing.length === 0)
    return (
      <Stack gap="lg" px="xs">
        {/* Header */}
        <Group gap="md" justify="space-between">
          <Text w={32}>From</Text>
          <Text w={75} ta="right">
            Amount/mo
          </Text>
          <Text w={32} ta="center">
            Token
          </Text>
          <Text w={48} ta="right">
            Pool %
          </Text>
        </Group>
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No outgoing streams
          </Text>
          <Text c={colors.gray[2]}>Interact With Posts to start beaming</Text>
        </Flex>
      </Stack>
    );

  return (
    <Stack gap="lg" px="xs">
      <Group gap="md" justify="space-between">
        <Text w={32}>From</Text>
        <Text w={75} ta="right">
          Amount/mo
        </Text>
        <Text w={32} ta="center">
          Token
        </Text>
        <Text w={48} ta="right">
          Pool %
        </Text>
      </Group>

      {userSubscription.outgoing.map((item) => {
        const perUnitFlowRate =
          BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
        const beamFlowRate = perUnitFlowRate * BigInt(item.units);
        const percentage = Number(
          (
            (Number(item.units) / Number(item.beamPool?.totalUnits)) *
            100
          ).toFixed(2)
        );
        return (
          <Group key={item.id} gap="md" justify="space-between">
            <Group gap="sm">
              <Avatar size={32} radius="xl" src={item.to?.profile?.pfp_url} />
            </Group>

            <Text w={75} ta="center">
              {flowratePerSecondToMonth(beamFlowRate)}
            </Text>
            <Box w={32} ta="center">
              <Avatar size={32} radius="xl" src={beamrLogo} />
            </Box>
            <Text w={48} ta="center">
              {percentage}%
            </Text>
          </Group>
        );
      })}
    </Stack>
  );
};

const Receiving = () => {
  const { userSubscription } = useUser();
  const { colors } = useMantineTheme();

  if (!userSubscription) {
    return <Text>No Subscription</Text>;
  }

  if (userSubscription && userSubscription.incoming.length === 0)
    return (
      <Stack gap="lg" px="xs">
        <Group gap="md" justify="space-between">
          <Text w={32}>To</Text>
          <Text w={75} ta="right">
            Amount/mo
          </Text>
          <Text w={32} ta="center">
            Token
          </Text>
          <Text w={48} ta="right">
            Pool %
          </Text>
        </Group>
        <Flex justify={'center'} align={'center'} h={100} direction={'column'}>
          <Text size="xl" mb="md">
            No incoming streams
          </Text>
          <Text c={colors.gray[2]}>No on has beamed to you yet.</Text>
        </Flex>
      </Stack>
    );

  return (
    <Stack gap="lg" px="xs">
      <Group gap="md" justify="space-between">
        <Text w={32}>To</Text>
        <Text w={75} ta="right">
          Amount/mo
        </Text>
        <Text w={32} ta="center">
          Token
        </Text>
        <Text w={48} ta="right">
          Pool %
        </Text>
      </Group>

      {userSubscription.incoming.map((item) => {
        const perUnitFlowRate =
          BigInt(item.beamPool?.flowRate) / BigInt(item.beamPool?.totalUnits);
        const beamFlowRate = perUnitFlowRate * BigInt(item.units);
        const percentage = Number(
          (
            (Number(item.units) / Number(item.beamPool?.totalUnits)) *
            100
          ).toFixed(2)
        );
        return (
          <Group key={item.id} gap="md" justify="space-between">
            <Group gap="sm">
              <Avatar size={32} radius="xl" src={item.from?.profile?.pfp_url} />
            </Group>

            <Text w={75} ta="center">
              {flowratePerSecondToMonth(beamFlowRate)}
            </Text>
            <Box w={32} ta="center">
              <Avatar size={32} radius="xl" src={beamrLogo} />
            </Box>
            <Text w={48} ta="center">
              {percentage}%
            </Text>
          </Group>
        );
      })}
    </Stack>
  );
};

// const OrgChart = () => {
//   return (
//     <Box>
//       <Text fz="xl" variant="highlight" mb="sm">
//         Arrow Chart
//       </Text>
//       {/*
//       <Box pos="relative" h={300}>
//         <Group>
//           <Box>
//           </Box>
//           </Group> */}
//       <Flex direction="column" align="center" mb="xl" gap={4}>
//         <Avatar size={28} bg="red" />
//         <Arrow />
//         <Avatar size={28} bg="red" />
//       </Flex>
//       <Flex direction="column" align="center">
//         <Avatar size={28} bg="red" />
//         <Box style={{ transform: 'Rotate(-20deg)' }}>
//           <Arrow />
//         </Box>

//         <Group>
//           <Avatar size={28} bg="red" />
//           <Avatar size={28} bg="red" />
//         </Group>
//       </Flex>
//       {/* </Box> */}
//     </Box>
//   );
// };

// const Toggle = () => {
//   return (
//     <Box>
//       <Text fz="xl" variant="highlight" mb="sm">
//         Toggle
//       </Text>

//       <SegmentedControl data={['Recent', 'Leaderboard']} />
//     </Box>
//   );
// };

// const Inputs = () => {
//   return (
//     <Stack gap="xl">
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Select
//         </Text>
//         <Stack gap="md">
//           <Select
//             label="Base Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//           />
//           <Select
//             label="Error Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             error="This is an error"
//           />
//           <Select
//             label="With Description"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             description="This is a description"
//           />
//           <Select
//             label="Filled Input"
//             placeholder="Pick value"
//             data={['React', 'Angular', 'Vue', 'Svelte']}
//             defaultValue={'Vue'}
//           />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Number Input
//         </Text>
//         <Stack gap="md">
//           <NumberInput
//             label="Base Input"
//             rightSection={'BEAMR'}
//             rightSectionWidth={70}
//           />
//           <NumberInput
//             label="Input With Description"
//             rightSection={'BEAMR'}
//             rightSectionWidth={70}
//             description="This is a description"
//           />
//           <NumberInput
//             label="Input With Error"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             error="This is an error"
//           />
//           <NumberInput
//             label="Required Input"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             required
//           />
//           <NumberInput
//             label="Filled Input"
//             rightSection={'ETH'}
//             rightSectionWidth={50}
//             value={12345.67}
//           />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Textarea
//         </Text>
//         <Stack gap="md">
//           <Textarea label="Base Input" placeholder="This is placeholder text" />
//           <Textarea
//             label="Input With Description"
//             placeholder="This is placeholder text"
//             description="This is a description"
//           />
//           <Textarea
//             label="Base Input Error"
//             placeholder="This is placeholder text"
//             error="This is an error message"
//           />
//           <Textarea
//             label="Required Input"
//             placeholder="This is placeholder text"
//             required
//           />
//           <Textarea label="Filled Input" value={'Filled Input'} />
//         </Stack>
//       </Box>
//       <Box>
//         <Text fz="xl" variant="highlight" mb="sm">
//           Text Input
//         </Text>
//         <Stack gap="md">
//           <TextInput
//             label="Base Input"
//             placeholder="This is placeholder text"
//           />
//           <TextInput
//             label="Input With Description"
//             placeholder="This is placeholder text"
//             description="This is a description"
//           />

//           <TextInput
//             label="Base Input Error"
//             placeholder="This is placeholder text"
//             error="This is an error message"
//           />
//           <TextInput
//             label="Required Input"
//             placeholder="This is placeholder text"
//             required
//           />
//           <TextInput label="Filled Input" value={'Filled Input'} />
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };

// const Buttons = () => {
//   return (
//     <Stack>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Primary Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button size="lg">Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button>Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button size="sm">Primary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button size="xs">Primary</Button>
//           </Box>
//         </Stack>
//       </Box>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Secondary Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button variant="secondary" size="lg">
//               Secondary
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button variant="secondary">Secondary</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button variant="secondary" size="sm">
//               Secondary
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button variant="secondary" size="xs">
//               Secondary
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//       <Box mt="lg">
//         <Text fz={'xl'} variant="highlight" mb="sm">
//           Disabled Button
//         </Text>
//         <Stack>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               L
//             </Text>
//             <Button size="lg" disabled>
//               Disabled
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               M
//             </Text>
//             <Button disabled>Disabled</Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               S
//             </Text>
//             <Button disabled size="sm">
//               Disabled
//             </Button>
//           </Box>
//           <Box>
//             <Text fz={30} variant="label" mb="sm">
//               XS
//             </Text>
//             <Button disabled size="xs">
//               Disabled
//             </Button>
//           </Box>
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };
