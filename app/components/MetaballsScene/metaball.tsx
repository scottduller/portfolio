import { Parameters, State } from './Metaballs'
import { normBetween } from './utils'
import * as THREE from 'three'

/**
 * Adds a ball to the metaballs scene.
 *
 * @param {number} ballY The y-coordinate of the ball.
 * @param {number} ballX The x-coordinate of the ball.
 * @param {number} ballZ The z-coordinate of the ball.
 * @param {number} strength The strength of the ball.
 * @param {number} subtract The subtract value.
 */
export const addBall = (
  ballX: number,
  ballY: number,
  ballZ: number,
  strength: number,
  subtract: number,
  aspectX: number,
  state: State & { parameters: React.MutableRefObject<Parameters | undefined> },
) => {
  const { caches, parameters } = state
  const { size, sizeX, sizeXY, sizeY, sizeZ } = parameters.current!

  const colorOffset = 0.2
  const colorR =
    1 - normBetween(ballX, colorOffset, aspectX - colorOffset, 0, 1)
  const colorB = normBetween(ballX, colorOffset, aspectX - colorOffset, 0, 1)

  const ballColor = new THREE.Color(colorR, 0, colorB)

  // Set the sign of the strength
  const sign = Math.sign(strength)
  strength = Math.abs(strength)

  // Calculate the radius of the ball
  const xs = ballX * size
  const ys = ballY * size
  const zs = ballZ * size
  const radius = size * Math.sqrt(strength / subtract)

  // Calculate the bounds for the ball
  let minX = Math.floor(xs - radius)
  if (minX < 1) minX = 1
  let maxX = Math.floor(xs + radius)
  if (maxX > sizeX - 1) maxX = sizeX - 1

  let minY = Math.floor(ys - radius)
  if (minY < 1) minY = 1
  let maxY = Math.floor(ys + radius)
  if (maxY > sizeY - 1) maxY = sizeY - 1

  let minZ = Math.floor(zs - radius)
  if (minZ < 1) minZ = 1
  let maxZ = Math.floor(zs + radius)
  if (maxZ > sizeZ - 1) maxZ = sizeZ - 1

  let x, y, z, offset, yOff, zOff, dx, dy, dz, dx2, dy2, dz2, value

  // Iterate over the bounds and add the ball to the field
  for (z = minZ; z < maxZ; z++) {
    // Calculate the z-offset and the z-coordinate
    zOff = z * sizeXY
    dz = z / size - ballZ
    dz2 = dz * dz

    for (y = minY; y < maxY; y++) {
      // Calculate the y-offset and the y-coordinate
      yOff = zOff + y * sizeX
      dy = y / size - ballY
      dy2 = dy * dy

      for (x = minX; x < maxX; x++) {
        // Calculate the x-coordinate and the distance
        offset = yOff + x
        dx = x / size - ballX
        dx2 = dx * dx
        value = strength / (dx2 + dy2 + dz2 + 0.000001) - subtract

        if (value > 0.0) {
          // Add the ball to the field
          caches.current!.field[offset] += value * sign

          const ratio =
            Math.sqrt(
              (x - xs) * (x - xs) + (y - ys) * (y - ys) + (z - zs) * (z - zs),
            ) / radius

          const smoothStep =
            1 - ratio * ratio * ratio * (ratio * (ratio * 6 - 15) + 10)

          // Add the ball to the palette
          caches.current!.palette[(yOff + x) * 3] +=
            ballColor.r * smoothStep * 2
          caches.current!.palette[(yOff + x) * 3 + 1] +=
            ballColor.g * smoothStep * 1
          caches.current!.palette[(yOff + x) * 3 + 2] +=
            ballColor.b * smoothStep * 4

          // caches.current!.palette[(yOff + x) * 3] = Math.max(
          //   Math.min(1, caches.current!.palette[(yOff + x) * 3]),
          //   0
          // );
          // caches.current!.palette[(yOff + x) * 3 + 1] = Math.max(
          //   Math.min(1, caches.current!.palette[(yOff + x) * 3 + 1]),
          //   0
          // );
          // caches.current!.palette[(yOff + x) * 3 + 2] = Math.max(
          //   Math.min(1, caches.current!.palette[(yOff + x) * 3 + 2]),
          //   0
          // );
        }
      }
    }
  }
}
