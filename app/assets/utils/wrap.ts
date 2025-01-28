export const wrap = (value: number, min: number, max: number) => {
  const range = max - min;
  return min + ((value - min) % range);
};
