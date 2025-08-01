import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreatePool } from './components/Home/CreatePool';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/create-pool" element={<CreatePool />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
