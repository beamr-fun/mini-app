import { Abi, Address, erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';

type Calls = {
  balanceOf?: boolean;
  totalSupply?: boolean;
  name?: boolean;
  symbol?: boolean;
  decimals?: boolean;
  allowance?: boolean;
};

type TokenHookProps = {
  abi?: Abi;
  address: Address;
  calls: Calls;
};

export const useToken = ({ abi = erc20Abi, address }: TokenHookProps) => {
  const {} = useReadContracts();
  //   const
};
