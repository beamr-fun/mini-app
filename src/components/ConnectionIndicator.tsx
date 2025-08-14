// import { useUser } from '../hooks/useUser';

// import { Avatar, Group, Tooltip } from '@mantine/core';
// import { Radio } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';

// export const ConnectionIndicator = () => {
//   const { isSocketConnected } = useUser();
//   const [forceOpened, setForceOpened] = useState(false);
//   const wasConnected = useRef(false);
//   const message = isSocketConnected ? 'Connected' : 'Disconnected';

//   const color = isSocketConnected ? 'green' : 'red';

//   useEffect(() => {
//     if (color === 'green') {
//       if (!wasConnected.current) {
//         wasConnected.current = true;
//       }
//     }
//     if (color === 'red' && wasConnected.current) {
//       wasConnected.current = false;
//       setForceOpened(true);
//       setTimeout(() => {
//         setForceOpened(false);
//       }, 3000);
//     }
//   }, [color]);
//   const tooltipProps = forceOpened ? { opened: true } : {};
//   return (
//     <Group gap="4">
//       <Tooltip label={message} {...tooltipProps}>
//         <Avatar bg={color} size="8" />
//       </Tooltip>
//       <Radio size={16} strokeWidth="1.2px" />
//     </Group>
//   );
// };
