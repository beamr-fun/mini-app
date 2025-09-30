import { Box, Select, Text } from '@mantine/core';
import { Link, Outlet, useParams } from 'react-router-dom';
import { PageTitle } from '../PageTitle';
import { Bold } from '../typography';

const titles = ['Unknown', 'About Beamr', 'Set Budget', 'Choose Friends'];

export const CreatePool = () => {
  const params = useParams();

  const subroute = params['*'];
  const routeNumber = subroute ? parseInt(subroute) : 0;

  return (
    <Box>
      <PageTitle title={titles[routeNumber]} />
      <Outlet />
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
        Beamr is a social streaming mini-app that allows you to{' '}
        <Bold>stre</Bold>
      </Text>
      <Text mb="xl">Beamr</Text>
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
