import { Text, TextProps } from '@mantine/core';
import React from 'react';
import {
  toFixedUsingString,
  useFlowingBalance,
  useSignificantFlowingDecimal,
} from '../hooks/useFlowingBalance';
import { formatEther } from 'viem';

type DancingTextProps = TextProps & {
  userBalance: bigint;
  fetchedAt: Date;
  flowRate: bigint;
};

export const DancingText = ({
  userBalance,
  fetchedAt,
  flowRate,
  ...rest
}: DancingTextProps) => {
  const flowingBalance = useFlowingBalance(userBalance, fetchedAt, flowRate);
  const decimalPlaces = useSignificantFlowingDecimal(flowRate, 10);
  return (
    <Text {...rest}>
      {decimalPlaces !== undefined
        ? toFixedUsingString(formatEther(flowingBalance), decimalPlaces)
        : formatEther(flowingBalance)}
    </Text>
  );
};
