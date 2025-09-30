import { createBrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CreatePool, Step1, Step2 } from './components/Home/CreatePool';
import { Home } from './pages/Home';

export const router = createBrowserRouter([
  { path: '/home', element: <Home /> },
  {
    path: '/create-pool',
    element: <CreatePool />,
    children: [
      { index: true, element: <Navigate to="1" replace /> },
      { path: '1', element: <Step1 /> },
      { path: '2', element: <Step2 /> },
    ],
  },
  { path: '*', element: <Navigate to="/home" replace /> },
]);
