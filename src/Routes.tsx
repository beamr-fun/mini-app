import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CreatePool } from './components/Home/CreatePool';

import { Home } from './pages/Home';
import { Explainer } from './pages/Explainer';
import { Budget } from './pages/Budget';
import { Friends } from './pages/Friends';

export const router = createBrowserRouter([
  { path: '/home', element: <Home /> },
  {
    path: '/create-pool',
    element: <CreatePool />,
    children: [
      { index: true, element: <Navigate to="1" replace /> },
      { path: '1', element: <Explainer /> },
      { path: '2', element: <Budget /> },
      { path: '3', element: <Friends /> },
    ],
  },
  { path: '*', element: <Navigate to="/home" replace /> },
]);
