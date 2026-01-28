import { formatUnits } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { formatDistanceToNowStrict } from 'date-fns';

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
  const floored = Math.round(num * factor) / factor;

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

export const flowratePerSecondToMonth = (
  flowrate: bigint,
  format?: 'rounded' | 'monthly' | 'raw' | 'parsed' | 'no-label',
  decimals = 18
): string => {
  const secondsInMonth = BigInt(60 * 60 * 24 * 30);
  const units = flowrate * secondsInMonth;

  if (format === 'raw') {
    return units.toString();
  }

  if (format === 'parsed') {
    return formatUnits(units, decimals);
  }

  if (format === 'rounded') {
    const formatted = formatUnits(units, decimals);

    // round to nearest integer

    return Math.round(parseFloat(formatted)).toString();
  }

  if (format === 'no-label') {
    return formatUnitBalance(units, decimals, 2);
  }

  if (!format || format === 'monthly') {
    return `${formatUnitBalance(units, decimals, 2)}/mo`;
  }

  return `${formatUnitBalance(units, decimals, 2)}/mo`;
};

export const flowratePerMonthToSecond = (monthlyAmount: bigint): bigint => {
  const secondsInMonth = BigInt(60 * 60 * 24 * 30);
  return monthlyAmount / secondsInMonth;
};

export const charLimit = (str: string, limit: number): string => {
  if (str.length <= limit) return str;
  return str.slice(0, limit) + '...';
};

export const nowInSeconds = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const calculateFeeFromNet = (
  netAmount: bigint,
  feePercentage: number
): bigint => {
  const precision = 100;
  const totalParts = 100 * precision;
  const feeParts = Math.round(feePercentage * precision);
  const netParts = BigInt(totalParts - feeParts);

  const principle = (netAmount * BigInt(totalParts)) / netParts;

  return principle - netAmount;
};

export function timeAgo(timestamp: string | Date | number): string {
  const date = new Date(timestamp);

  const distance = formatDistanceToNowStrict(date, { addSuffix: false });

  // Convert to short format
  const shortMap: Record<string, string> = {
    second: 's',
    seconds: 's',
    minute: 'm',
    minutes: 'm',
    hour: 'h',
    hours: 'h',
    day: 'd',
    days: 'd',
    month: 'mo',
    months: 'mo',
    year: 'y',
    years: 'y',
  };

  const [value, unit] = distance.split(' ');
  const shortUnit = shortMap[unit] || unit;

  return `${value}${shortUnit}`;
}
