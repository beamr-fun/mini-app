import { Navigate, Route, Routes } from 'react-router-dom';
import { CreatePool } from './components/Home/CreatePool';

import { Home } from './pages/Home';
import { Explainer } from './pages/Explainer';
import { Budget } from './pages/Budget';
import { Friends } from './pages/Friends';
import { CreateConfirm } from './pages/CreateConfirm';
import { Text } from '@mantine/core';
import { useUser } from './hooks/useUser';
import { Global } from './pages/Global';
import { Settings } from './pages/Settings';

const ConditionalRedirect = () => {
  const { startingRoute } = useUser();

  if (startingRoute === '/' || !startingRoute) {
    return <Text>Loading...</Text>;
  }

  return <Navigate to={startingRoute} replace />;
};

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ConditionalRedirect />} />
      <Route path="/home" element={<Home />} />
      <Route path="/global" element={<Global />} />
      <Route path="/settings" element={<Settings />} />
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
