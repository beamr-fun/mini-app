import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import './styles/transitions.css';
import { Layout } from './layouts/Layout';

export default function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}
