import { Box, Group, Image } from '@mantine/core';
import beamrLogo from '../assets/beamrLogo.png';

export const BeamrHeadline = () => {
  return (
    <Group justify="center">
      <Box w={80} h={80} mb="xl">
        <Image
          src={beamrLogo}
          alt="Beamr Logo"
          w={'100%'}
          h={'100%'}
          fit="contain"
        />
      </Box>
    </Group>
  );
};
