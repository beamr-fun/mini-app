import {
  Box,
  Button,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';

export const Home = () => {
  return (
    <Box>
      <Text mb="sm" variant="label">
        Welcome!
      </Text>
      <Text mb={'md'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae
        felis ac leo elementum ultrices nec ut ex.
      </Text>
      <Text mb="xl">
        Duis porta libero et velit imperdiet, vulputate viverra enim feugiat. In
        nec tempor diam. Donec a maximus enim. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        Praesent sed magna at magna placerat mattis.
      </Text>
      <Inputs />
      <Buttons />
    </Box>
  );
};

const Inputs = () => {
  return (
    <Stack gap="xl">
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
