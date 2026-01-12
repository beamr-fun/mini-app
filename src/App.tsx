import { ClientRoutes } from './Routes';
import './styles/transitions.css';
import { Layout } from './layouts/Layout';
import { BrowserRouter } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ClientRoutes />
      </Layout>
    </BrowserRouter>
  );
}
