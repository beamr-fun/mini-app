import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

export const truncateAddress = (address: string, length = 6): string => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const generateRandomAddress = () => {
  const pk = generatePrivateKey();

  const account = privateKeyToAccount(pk);

  return account.address;
};
