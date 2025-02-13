export const normalize = (
  value: number,
  valueMin: number,
  valueMax: number,
  targetMin: number,
  targetMax: number
) => {
  return (
    targetMin
    + ((value - valueMin) * (targetMax - targetMin)) / (valueMax - valueMin)
  );
};
