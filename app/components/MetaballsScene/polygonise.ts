import { lerp } from 'three/src/math/MathUtils.js'
import { edgeTable, triTable } from './tables'
import { State } from './Metaballs'

function VIntX(
  q: number,
  offset: number,
  isol: number,
  x: number,
  y: number,
  z: number,
  valp1: number,
  valp2: number,
  c_offset1: number,
  c_offset2: number,
  state: State,
) {
  const { caches, deltaValues, buffers } = state

  // Calculate the interpolation factor
  const mu = (isol - valp1) / (valp2 - valp1)
  const { palette, normalCache: nc } = caches.current!
  const { vList, nList, cList } = buffers.current
  const { deltaX } = deltaValues.current!

  // Calculate the interpolated vertex, normal and color values and store them in the buffer lists
  vList[offset + 0] = x + mu * deltaX
  vList[offset + 1] = y
  vList[offset + 2] = z

  nList[offset + 0] = lerp(nc[q + 0], nc[q + 3], mu)
  nList[offset + 1] = lerp(nc[q + 1], nc[q + 4], mu)
  nList[offset + 2] = lerp(nc[q + 2], nc[q + 5], mu)

  cList[offset + 0] = lerp(
    palette[c_offset1 * 3 + 0],
    palette[c_offset2 * 3 + 0],
    mu,
  )
  cList[offset + 1] = lerp(
    palette[c_offset1 * 3 + 1],
    palette[c_offset2 * 3 + 1],
    mu,
  )
  cList[offset + 2] = lerp(
    palette[c_offset1 * 3 + 2],
    palette[c_offset2 * 3 + 2],
    mu,
  )
}

function VIntY(
  q: number,
  offset: number,
  isol: number,
  x: number,
  y: number,
  z: number,
  valp1: number,
  valp2: number,
  c_offset1: number,
  c_offset2: number,
  state: State,
) {
  const { caches, deltaValues, buffers } = state

  // Calculate the interpolation factor
  const mu = (isol - valp1) / (valp2 - valp1)
  const { palette, normalCache: nc } = caches.current!
  const { vList, nList, cList } = buffers.current
  const { deltaY, yOffset } = deltaValues.current!

  // Calculate the interpolated vertex, normal and color values and store them in the buffer lists
  vList[offset + 0] = x
  vList[offset + 1] = y + mu * deltaY
  vList[offset + 2] = z

  const q2 = q + yOffset * 3

  nList[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu)
  nList[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu)
  nList[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu)

  cList[offset + 0] = lerp(
    palette[c_offset1 * 3 + 0],
    palette[c_offset2 * 3 + 0],
    mu,
  )
  cList[offset + 1] = lerp(
    palette[c_offset1 * 3 + 1],
    palette[c_offset2 * 3 + 1],
    mu,
  )
  cList[offset + 2] = lerp(
    palette[c_offset1 * 3 + 2],
    palette[c_offset2 * 3 + 2],
    mu,
  )
}

function VIntZ(
  q: number,
  offset: number,
  isol: number,
  x: number,
  y: number,
  z: number,
  valp1: number,
  valp2: number,
  c_offset1: number,
  c_offset2: number,
  state: State,
) {
  const { caches, deltaValues, buffers } = state

  // Calculate the interpolation factor
  const mu = (isol - valp1) / (valp2 - valp1)
  const { palette, normalCache: nc } = caches.current!
  const { vList, nList, cList } = buffers.current
  const { deltaX, zOffset } = deltaValues.current!

  // Calculate the interpolated vertex, normal and color values and store them in the buffer lists
  vList[offset + 0] = x
  vList[offset + 1] = y
  vList[offset + 2] = z + mu * deltaX

  const q2 = q + zOffset * 3

  nList[offset + 0] = lerp(nc[q + 0], nc[q2 + 0], mu)
  nList[offset + 1] = lerp(nc[q + 1], nc[q2 + 1], mu)
  nList[offset + 2] = lerp(nc[q + 2], nc[q2 + 2], mu)

  cList[offset + 0] = lerp(
    palette[c_offset1 * 3 + 0],
    palette[c_offset2 * 3 + 0],
    mu,
  )
  cList[offset + 1] = lerp(
    palette[c_offset1 * 3 + 1],
    palette[c_offset2 * 3 + 1],
    mu,
  )
  cList[offset + 2] = lerp(
    palette[c_offset1 * 3 + 2],
    palette[c_offset2 * 3 + 2],
    mu,
  )
}

function compNorm(q: number, state: State) {
  const { caches, deltaValues } = state

  const { normalCache, field } = caches.current!
  const { yOffset, zOffset } = deltaValues.current!

  // Compute the normal for the given index and store it in the normal cache
  const q3 = q * 3

  if (normalCache[q3] === 0.0) {
    // Calculate field values once
    const field1 = field[q - 1]
    const field2 = field[q + 1]
    const field3 = field[q - yOffset]
    const field4 = field[q + yOffset]
    const field5 = field[q - zOffset]
    const field6 = field[q + zOffset]

    normalCache[q3 + 0] = field1 - field2
    normalCache[q3 + 1] = field3 - field4
    normalCache[q3 + 2] = field5 - field6
  }
}

function posnormtriv(
  pos: Float32Array,
  norm: Float32Array,
  colors: Float32Array,
  o1: number,
  o2: number,
  o3: number,
  state: State,
) {
  const { arrays, vertexCount, enableColors } = state

  const c = vertexCount.current! * 3

  const { positionArray, normalArray, colorArray } = arrays.current!
  const isColors = enableColors.current

  // Calculate pos, norm and colors values once
  const pos1 = [pos[o1], pos[o1 + 1], pos[o1 + 2]]
  const pos2 = [pos[o2], pos[o2 + 1], pos[o2 + 2]]
  const pos3 = [pos[o3], pos[o3 + 1], pos[o3 + 2]]

  const norm1 = [norm[o1], norm[o1 + 1], norm[o1 + 2]]
  const norm2 = [norm[o2], norm[o2 + 1], norm[o2 + 2]]
  const norm3 = [norm[o3], norm[o3 + 1], norm[o3 + 2]]

  const colors1 = isColors ? [colors[o1], colors[o1 + 1], colors[o1 + 2]] : []
  const colors2 = isColors ? [colors[o2], colors[o2 + 1], colors[o2 + 2]] : []
  const colors3 = isColors ? [colors[o3], colors[o3 + 1], colors[o3 + 2]] : []

  // Update the position, normal, and color arrays with the given vertex data
  positionArray.set(pos1, c)
  positionArray.set(pos2, c + 3)
  positionArray.set(pos3, c + 6)

  normalArray.set(norm1, c)
  normalArray.set(norm2, c + 3)
  normalArray.set(norm3, c + 6)

  if (isColors) {
    colorArray!.set(colors1, c)
    colorArray!.set(colors2, c + 3)
    colorArray!.set(colors3, c + 6)
  }

  vertexCount.current! += 3
}

export const polygonise = (
  dx: number,
  dy: number,
  dz: number,
  q: number,
  isol: number,
  state: State,
) => {
  const { caches, deltaValues, buffers } = state
  const { field } = caches.current!
  const { deltaX, deltaY, deltaZ, yOffset, zOffset } = deltaValues.current!
  const { vList, nList, cList } = buffers.current

  // Define the indices of the cube vertices
  const q1 = q + 1
  const qy = q + yOffset
  const qz = q + zOffset
  const q1y = q1 + yOffset
  const q1z = q1 + zOffset
  const qyz = q + yOffset + zOffset
  const q1yz = q1 + yOffset + zOffset

  let cubeindex = 0

  // Define the field values at the cube vertices
  const field0 = field[q]
  const field1 = field[q1]
  const field2 = field[qy]
  const field3 = field[q1y]
  const field4 = field[qz]
  const field5 = field[q1z]
  const field6 = field[qyz]
  const field7 = field[q1yz]

  // Determine the index of the cube configuration
  if (field0 < isol) cubeindex |= 1
  if (field1 < isol) cubeindex |= 2
  if (field2 < isol) cubeindex |= 8
  if (field3 < isol) cubeindex |= 4
  if (field4 < isol) cubeindex |= 16
  if (field5 < isol) cubeindex |= 32
  if (field6 < isol) cubeindex |= 128
  if (field7 < isol) cubeindex |= 64

  // Determine the edge mask for the cube configuration to find the edge intersections
  const edgeMask = edgeTable[cubeindex]
  if (edgeMask === 0) return 0

  // Define the interpolated vertex and color values for the edge intersections
  const dx2 = dx + deltaX
  const dy2 = dy + deltaY
  const dz2 = dz + deltaZ

  if (edgeMask & 1) {
    compNorm(q, state)
    compNorm(q1, state)
    VIntX(q * 3, 0, isol, dx, dy, dz, field0, field1, q, q1, state)
  }

  if (edgeMask & 2) {
    compNorm(q1, state)
    compNorm(q1y, state)
    VIntY(q1 * 3, 3, isol, dx2, dy, dz, field1, field3, q1, q1y, state)
  }

  if (edgeMask & 4) {
    compNorm(qy, state)
    compNorm(q1y, state)
    VIntX(qy * 3, 6, isol, dx, dy2, dz, field2, field3, qy, q1y, state)
  }

  if (edgeMask & 8) {
    compNorm(q, state)
    compNorm(qy, state)
    VIntY(q * 3, 9, isol, dx, dy, dz, field0, field2, q, qy, state)
  }

  if (edgeMask & 16) {
    compNorm(qz, state)
    compNorm(q1z, state)
    VIntX(qz * 3, 12, isol, dx, dy, dz2, field4, field5, qz, q1z, state)
  }

  if (edgeMask & 32) {
    compNorm(q1z, state)
    compNorm(q1yz, state)
    VIntY(q1z * 3, 15, isol, dx2, dy, dz2, field5, field7, q1z, q1yz, state)
  }

  if (edgeMask & 64) {
    compNorm(qyz, state)
    compNorm(q1yz, state)
    VIntX(qyz * 3, 18, isol, dx, dy2, dz2, field6, field7, qyz, q1yz, state)
  }

  if (edgeMask & 128) {
    compNorm(qz, state)
    compNorm(qyz, state)
    VIntY(qz * 3, 21, isol, dx, dy, dz2, field4, field6, qz, qyz, state)
  }

  if (edgeMask & 256) {
    compNorm(q, state)
    compNorm(qz, state)
    VIntZ(q * 3, 24, isol, dx, dy, dz, field0, field4, q, qz, state)
  }

  if (edgeMask & 512) {
    compNorm(q1, state)
    compNorm(q1z, state)
    VIntZ(q1 * 3, 27, isol, dx2, dy, dz, field1, field5, q1, q1z, state)
  }

  if (edgeMask & 1024) {
    compNorm(q1y, state)
    compNorm(q1yz, state)
    VIntZ(q1y * 3, 30, isol, dx2, dy2, dz, field3, field7, q1y, q1yz, state)
  }

  if (edgeMask & 2048) {
    compNorm(qy, state)
    compNorm(qyz, state)
    VIntZ(qy * 3, 33, isol, dx, dy2, dz, field2, field6, qy, qyz, state)
  }

  // Generate the triangles for the current cube configuration
  cubeindex <<= 4

  let o1,
    o2,
    o3,
    numtris = 0,
    i = 0

  while (triTable[cubeindex + i] != -1) {
    o1 = cubeindex + i
    o2 = o1 + 1
    o3 = o1 + 2

    posnormtriv(
      vList,
      nList,
      cList,
      3 * triTable[o1],
      3 * triTable[o2],
      3 * triTable[o3],
      state,
    )

    i += 3
    numtris++
  }

  return numtris
}
