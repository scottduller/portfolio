export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const normBetween = (
  value: number,
  min: number,
  max: number,
  normMin: number,
  normMax: number,
) => ((value - min) * (normMax - normMin)) / (max - min) + normMin

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t

export const lerpVelocityFactor = (
  value: number,
  minValue: number,
  maxValue: number,
  minFactor: number,
  maxFactor: number,
) => {
  const rangeMid = (maxValue + minValue) / 2

  const t1 = (value - minValue) / (rangeMid - minValue)
  const t2 = (value - rangeMid) / (maxValue - rangeMid)

  if (value <= rangeMid) {
    return minFactor + (maxFactor - minFactor) * easeInOutCubic(t1)
  } else {
    return maxFactor + (minFactor - maxFactor) * easeInOutCubic(t2)
  }
}
