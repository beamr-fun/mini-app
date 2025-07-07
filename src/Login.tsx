import { Button } from '@mantine/core';
import { useAccount, useConnect } from 'wagmi';

export const Login = () => {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <>
        <div>You're connected!</div>
        <div>Address: {address}</div>
      </>
    );
  }

  return (
    <Button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect
    </Button>
  );
};
