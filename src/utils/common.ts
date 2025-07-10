export const truncateAddress = (address: string, length = 6): string => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
