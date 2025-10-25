import { ClientRoutes } from './Routes';
import './styles/transitions.css';
import { Layout } from './layouts/Layout';

export default function App() {
  return (
    <Layout>
      <ClientRoutes />
    </Layout>
  );
}
