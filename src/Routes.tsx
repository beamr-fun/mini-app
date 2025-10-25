import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { CreatePool } from './components/Home/CreatePool';

import { Home } from './pages/Home';
import { Explainer } from './pages/Explainer';
import { Budget } from './pages/Budget';
import { Friends } from './pages/Friends';
import { CreateConfirm } from './pages/CreateConfirm';
import { Text } from '@mantine/core';
import { useUser } from './hooks/useUser';

const ConditionalRedirect = () => {
  const { startingRoute } = useUser();

  if (startingRoute == '/' || !startingRoute) {
    return <Text>Loading...</Text>;
  }

  return <Navigate to={startingRoute} replace />;
};

export const ClientRoutes = () => {
  const router = createBrowserRouter([
    { path: '/', element: <ConditionalRedirect /> },

    { path: '/home', element: <Home /> },
    {
      path: '/create-pool',
      element: <CreatePool />,
      children: [
        { index: true, element: <Navigate to="1" replace /> },
        { path: '1', element: <Explainer /> },
        { path: '2', element: <Budget /> },
        { path: '3', element: <Friends /> },
        { path: '4', element: <CreateConfirm /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
