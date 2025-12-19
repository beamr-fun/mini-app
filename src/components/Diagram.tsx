import { Avatar, Box, Group, Text, useMantineTheme } from '@mantine/core';
import { Heart } from 'lucide-react';

const WARPLET_IMG = [
  'https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/e3d80f99-f7c0-4b04-dcad-557593d85500/anim=false,fit=contain,f=auto,w=336',
  'https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/58b5b261-45cb-4651-9bf3-c5d3dcd4cf00/anim=false,fit=contain,f=auto,w=288',
  'https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/4c570f6b-3680-405c-ea28-889e655efb00/anim=false,fit=contain,f=auto,w=288',
];

const Diagram = () => {
  const { colors } = useMantineTheme();
  return (
    <Box pos="relative" h={150} mb="md">
      <Box pos="absolute" left={60}>
        <Box pos={'relative'}>
          <Avatar
            size={28}
            src={WARPLET_IMG[0]}
            pos={'absolute'}
            bg="blue"
            left={0}
          />
          <Avatar
            size={28}
            src={WARPLET_IMG[1]}
            pos={'absolute'}
            bg="blue"
            left={0}
            top={92}
          />
          <Group
            pos="absolute"
            top={40}
            left={-9}
            style={{ zIndex: 10 }}
            wrap="nowrap"
            gap={2}
          >
            <Text fw={700} fz="xl" c={colors.red[7]}>
              +
            </Text>
            <Heart color={colors.red[7]} fill={colors.red[7]} size={20} />
          </Group>
          <Text
            fz="xs"
            pos={'absolute'}
            bg={colors.gray[8]}
            px={4}
            fw={700}
            top={126}
            left={-2}
            bdrs={6}
          >
            100%
          </Text>
          <svg
            width="18"
            height="55"
            style={{ position: 'absolute', top: 34, left: 8 }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto"
              >
                <polygon points="0 0, 4 2, 0 4" fill={colors.gray[0]} />
              </marker>
            </defs>

            <line
              x1="6"
              y1="0"
              x2="6"
              y2="50"
              stroke={colors.gray[0]}
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
              strokeDasharray={'4 4'}
            />
          </svg>
        </Box>
      </Box>
      <Box pos={'absolute'} right={120}>
        <Box pos={'relative'}>
          <Avatar
            size={28}
            src={WARPLET_IMG[0]}
            pos={'absolute'}
            bg="blue"
            left={0}
          />
          <Avatar
            size={28}
            src={WARPLET_IMG[1]}
            pos={'absolute'}
            bg="blue"
            left={-30}
            top={92}
          />
          <Avatar
            size={28}
            src={WARPLET_IMG[2]}
            pos={'absolute'}
            bg="blue"
            left={30}
            top={92}
          />
          <Group
            pos="absolute"
            top={40}
            left={28}
            style={{ zIndex: 10 }}
            wrap="nowrap"
            gap={2}
          >
            <Text fw={700} fz="xl" c={colors.red[7]}>
              +
            </Text>
            <Heart color={colors.red[7]} fill={colors.red[7]} size={20} />
          </Group>
          <Text
            fz="xs"
            pos={'absolute'}
            bg={colors.gray[8]}
            fw={700}
            px={4}
            top={126}
            left={-28}
            bdrs={6}
          >
            50%
          </Text>
          <Text
            fz="xs"
            pos={'absolute'}
            bg={colors.gray[8]}
            px={4}
            fw={700}
            top={126}
            left={28}
            bdrs={6}
          >
            50%
          </Text>
          <svg
            width="60"
            height="120"
            style={{ position: 'absolute', top: 25, left: 28 }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto"
              >
                <polygon points="0 0, 4 2, 0 4" fill="white" />
              </marker>
            </defs>
            <path
              d="M4 4 C30 25, 25 50, 20 60"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>
          <svg
            width="60"
            height="120"
            style={{
              position: 'absolute',
              top: 25,
              left: -60,
              transform: 'scaleX(-1)',
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto"
              >
                <polygon points="0 0, 4 2, 0 4" fill="white" />
              </marker>
            </defs>
            <path
              d="M4 4 C30 25, 25 50, 20 60"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default Diagram;
