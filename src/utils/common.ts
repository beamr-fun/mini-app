import { formatUnits } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

export const truncateAddress = (address: string, length = 6): string => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export const generateRandomAddress = () => {
  const pk = generatePrivateKey();

  const account = privateKeyToAccount(pk);

  return account.address;
};

export function formatBalance(balance: number | string, decimals = 2): string {
  let num = typeof balance === 'string' ? parseFloat(balance) : balance;
  if (isNaN(num)) return '0';

  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;

  while (Math.abs(num) >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  const factor = 10 ** decimals;
  const floored = Math.floor(num * factor) / factor;

  let str = floored.toFixed(decimals);
  str = str.replace(/\.?0+$/, '');

  return `${str}${units[unitIndex]}`;
}

export function formatUnitBalance(
  units: bigint,
  decimals = 18,
  displayDecimals = 2
): string {
  if (typeof units !== 'bigint') return '0';

  if (units === BigInt(0)) return '0';

  return formatBalance(formatUnits(units, decimals), displayDecimals);
}

export const flowratePerSecondToMonth = (flowrate: bigint): string => {
  const secondsInMonth = BigInt(60 * 60 * 24 * 30);
  const units = flowrate * secondsInMonth;

  return `${formatUnitBalance(units, 18, 2)}/mo`;
};
