import { Box, Select, Text } from '@mantine/core';
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
import '../../styles/transitions.css';

const titles = ['Unknown', 'About Beamr', 'Set Budget', 'Choose Friends'];

export const CreatePool = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log('supports VT?', !!document.startViewTransition);
  console.log(
    'reduced motion?',
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const subroute = params['*'];
  const routeNumber = subroute ? parseInt(subroute) : 0;

  return (
    <Box>
      <PageTitle title={titles[routeNumber]} />
      <Box>
        <Link to="/create-pool/1" viewTransition>
          Go to step 1
        </Link>
        <Link to="/create-pool/2" viewTransition style={{ marginLeft: 20 }}>
          Go to step 2
        </Link>
        <Routes>
          <Route index element={<Navigate to="1" replace />} />
          <Route path="1" element={<Step1 />} />
          <Route path="2" element={<Step2 />} />
        </Routes>
      </Box>
    </Box>
  );
};

export const Step1 = () => {
  return (
    <Box>
      <Text mb="sm" variant="label">
        Welcome!
      </Text>
      <Text mb={'md'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae
        felis ac leo elementum ultrices nec ut ex.
      </Text>
      <Text mb="xl">
        Duis porta libero et velit imperdiet, vulputate viverra enim feugiat. In
        nec tempor diam. Donec a maximus enim. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        Praesent sed magna at magna placerat mattis.
      </Text>
      <Select
        label="Pool Types"
        defaultValue={'Tipping pool'}
        placeholder=""
        data={['Tipping pool', 'Earn pool', 'Vue', 'Svelte']}
      />
    </Box>
  );
};

export const Step2 = () => {
  return <div> Step 2 </div>;
};
