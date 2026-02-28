export const getBeamFlowRate = (item: {
  beamPool?: {
    flowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const perUnitFlowRate = BigInt(item.beamPool?.flowRate || 0) / totalUnits;

  return perUnitFlowRate * BigInt(item.units || 0);
};

export const getOutgoingBeamFlowRate = (item: {
  beamPool?: {
    creatorFlowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const perUnitFlowRate =
    BigInt(item.beamPool?.creatorFlowRate || 0) / totalUnits;

  return perUnitFlowRate * BigInt(item.units || 0);
};

export const getOutgoingBoostFlowRate = (item: {
  beamPool?: {
    flowRate?: bigint | string;
    creatorFlowRate?: bigint | string;
    totalUnits?: bigint | string;
  } | null;
  units?: bigint | string;
}) => {
  const totalUnits = BigInt(item.beamPool?.totalUnits || 0);

  if (totalUnits === 0n) return 0n;

  const flowRate = BigInt(item.beamPool?.flowRate || 0);
  const creatorFlowRate = BigInt(item.beamPool?.creatorFlowRate || 0);
  const boostedFlowRate = flowRate - creatorFlowRate;

  if (boostedFlowRate <= 0n) return 0n;

  return (boostedFlowRate / totalUnits) * BigInt(item.units || 0);
};
