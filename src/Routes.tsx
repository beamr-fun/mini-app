import { Navigate, Route, Routes } from 'react-router-dom';
import { CreatePool } from './components/User/CreatePool';

import { User } from './pages/User';
import { Explainer } from './pages/Explainer';
import { Budget } from './pages/Budget';
import { Friends } from './pages/Friends';
import { CreateConfirm } from './pages/CreateConfirm';
import { Group } from '@mantine/core';
import { useUser } from './hooks/useUser';
import { Global } from './pages/Global';
import { Settings } from './pages/Settings';
import { Strategy } from './pages/Info';
import { PageLayout } from './layouts/PageLayout';
import { BeamrHeadline } from './components/BeamrHeadline';
import { Loader } from 'lucide-react';
import { useAccount } from 'wagmi';
import { network } from './utils/setup';
import { WrongNetwork } from './components/WrongNetwork';
import { ViewUser } from './pages/ViewUser';

const ConditionalRedirect = () => {
  const { startingRoute } = useUser();
  const { chain } = useAccount();

  if (chain?.id && chain.id !== network.id) {
    return <WrongNetwork />;
  }

  if (startingRoute === '/' || !startingRoute) {
    return (
      <PageLayout>
        <BeamrHeadline />
        <Group h={200} justify="center" align="center">
          <Loader size={28} color={'var(--glass-thick)'} />
        </Group>
      </PageLayout>
    );
  }

  return <Navigate to={startingRoute} replace />;
};

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ConditionalRedirect />} />
      <Route path="/home" element={<User />} />
      <Route path="/user/:fid" element={<ViewUser />} />
      <Route path="/global" element={<Global />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/info" element={<Strategy />} />
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
