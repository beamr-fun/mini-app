import { Box } from '@mantine/core';
import { useEffect } from 'react';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { PageTitle } from '../PageTitle';

const titles = ['Unknown', 'How It Works', 'Set Budget', 'Choose Friends'];

export const CreatePool = () => {
  const navigate = useNavigate();
  const params = useParams();

  const subroute = params['*'];
  const routeNumber = subroute ? parseInt(subroute) : 0;

  useEffect(() => {
    console.log('mount top');
  }, []);

  console.log('render top');

  return (
    <Box>
      <PageTitle title={titles[routeNumber]} />
      <Routes>
        <Route index element={<Navigate to="1" replace />} />
        <Route path="1" element={<Step1 />} />
        <Route path="2" element={<Step2 />} />
      </Routes>
    </Box>
  );
};

const Step1 = () => {
  return <div> Step 1 </div>;
};

const Step2 = () => {
  return <div> Step 2 </div>;
};
