import { MathUtils } from 'three'

const clamp = (
  minSize: number,
  maxSize: number,
  minWidth: number,
  maxWidth: number,
) => {
  const gradient = (maxSize - minSize) / (maxWidth - minWidth)
  const intercept = minSize - gradient * minWidth
  const lerp = intercept + gradient * window.innerWidth

  return MathUtils.clamp(lerp, minSize, maxSize)
}

export default clamp
