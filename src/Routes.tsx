import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CreatePool } from './components/Home/CreatePool';

import { Home } from './pages/Home';
import { Explainer } from './pages/Explainer';
import { Budget } from './pages/Budget';
import { Friends } from './pages/Friends';
import { CreateConfirm } from './pages/CreateConfirm';
import { Box, Button, Text } from '@mantine/core';
import { useUser } from './hooks/useUser';
import { Global } from './pages/Global';
import { Settings } from './pages/Settings';
import { Strategy } from './pages/Strategy';
import { useConnect, useWalletClient } from 'wagmi';
import { transfer } from './utils/interactions';

const ConditionalRedirect = () => {
  const { startingRoute } = useUser();
  const { data: walletClient } = useWalletClient();
  const { connect, connectors } = useConnect();
  const location = useLocation();

  if (startingRoute === '/' || !startingRoute) {
    // const handleTransfer = () => {
    //   console.log('walletClient', walletClient);
    //   if (!walletClient) return;

    //   connect({ connector: connectors[0] });

    //   transfer({
    //     walletClient,
    //     amount: BigInt(1000000),
    //     to: '0xA55905B9053BB0710432ae15Ed863F97B109393B',
    //   });
    // };

    return (
      <Box>
        {/* <Button onClick={handleTransfer}>Transfer</Button> */}
        <Text>YOU SHOULD NOT SEE THIS</Text>
      </Box>
    );
  }

  return <Navigate to={startingRoute} replace />;
};

export const ClientRoutes = () => {
  console.log('location', location.pathname);
  return (
    <Routes>
      <Route path="/" element={<ConditionalRedirect />} />
      <Route path="/home" element={<Home />} />
      <Route path="/global" element={<Global />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/strategy" element={<Strategy />} />
      <Route path="/create-pool" element={<CreatePool />}>
        <Route index element={<Navigate to="1" replace />} />
        <Route path="1" element={<Explainer />} />
        <Route path="2" element={<Budget />} />
        <Route path="3" element={<Friends />} />
        <Route path="4" element={<CreateConfirm />} />
      </Route>
    </Routes>
  );
};
