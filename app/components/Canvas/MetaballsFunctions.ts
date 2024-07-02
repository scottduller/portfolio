import * as THREE from 'three'
import { normBetween } from './utils'
import { polygonise } from './polygonise'
import { Arrays, Ball, Buffers, Caches, Deltas, Parameters } from './Metaballs'

export const updateParameters = (
  resolution: number,
  aspectX: number,
  aspectY: number,
  aspectZ: number,
  subtract: number,
  strength: number,
  maxPolyCount: number,
  geometryRef: React.MutableRefObject<THREE.BufferGeometry>,
) => {
  const sizeX = Math.ceil(resolution * aspectX)
  const sizeY = Math.ceil(resolution * aspectY)
  const sizeZ = Math.floor(resolution * aspectZ)

  const params = {
    isol: 80,
    size: resolution,
    sizeX: sizeX,
    sizeY: sizeY,
    sizeZ: sizeZ,
    sizeXY: sizeX * sizeY,
    sizeXYZ: sizeX * sizeY * sizeZ,
    halfSize: resolution / 2,
    subtract: subtract,
    strength: strength,
  }

  const deltas = {
    deltaX: aspectX / sizeX,
    deltaY: aspectY / sizeY,
    deltaZ: aspectZ / sizeZ,
    yOffset: sizeX,
    zOffset: params.sizeXY,
  }

  const caches = {
    field: new Float32Array(params.sizeXYZ * 3),
    normalCache: new Float32Array(params.sizeXYZ * 3),
    palette: new Float32Array(params.sizeXYZ * 3),
  }

  const arrays = {
    positionArray: new Float32Array(maxPolyCount * 3),
    normalArray: new Float32Array(maxPolyCount * 3),
    colorArray: new Float32Array(maxPolyCount * 3),
  }

  const buffers = {
    vList: new Float32Array(12 * 3),
    nList: new Float32Array(12 * 3),
    cList: new Float32Array(12 * 3),
  }

  geometryRef.current!.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1)

  const geometry = geometryRef.current

  const maxVertexCount = maxPolyCount * 3

  // Set position attribute for the mesh geometry
  const positionsAttribute = new THREE.BufferAttribute(arrays.positionArray, 3)
  positionsAttribute.setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute('position', positionsAttribute)

  // Set normal attribute for the mesh geometry
  const normalsAttribute = new THREE.BufferAttribute(arrays.normalArray, 3)
  normalsAttribute.setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute('normal', normalsAttribute)

  // Set color attribute for the mesh geometry if colors are enabled
  arrays.colorArray = new Float32Array(maxVertexCount * 3)
  const colorsAttribute = new THREE.BufferAttribute(arrays.colorArray, 3)
  colorsAttribute.setUsage(THREE.DynamicDrawUsage)
  geometry.setAttribute('color', colorsAttribute)

  return { params, deltas, caches, arrays, buffers }
}

export const update = (
  params: Parameters,
  aspectX: number,
  aspectY: number,
  aspectZ: number,
  deltas: Deltas,
  caches: Caches,
  arrays: Arrays,
  buffers: Buffers,
  vertexCount: React.MutableRefObject<number>,
) => {
  const { sizeX, sizeY, sizeZ, sizeXY, isol } = params

  vertexCount.current = 0

  // Iterate over the grid and perform polygonisation on each cube
  for (let z = 1; z < sizeZ / 1.15 - 2; z++) {
    // Calculate the z-coordinate and the z-offset
    const zOffset = z * sizeXY
    const dz = normBetween(z, 0, sizeZ, 0, aspectZ)

    for (let y = 1; y < sizeY - 2; y++) {
      // Calculate the y-coordinate and the y-offset
      const yOffset = zOffset + sizeX * y
      const dy = normBetween(y, 0, sizeY, -aspectY / 2, aspectY / 2)

      for (let x = 1; x < sizeX - 2; x++) {
        // Calculate the x-coordinate and the index of the current cube
        const q = yOffset + x
        const dx = normBetween(x, 0, sizeX, -aspectX / 2, aspectX / 2)

        polygonise(dx, dy, dz, q, isol, vertexCount, {
          buffers,
          caches,
          deltas,
          arrays,
        })

        // console.log('vertexCount', vertexCount)
      }
    }
  }

  // console.log('vertexCount', vertexCount)

  return vertexCount
}

export const updateGeometry = (
  geometry: React.MutableRefObject<THREE.BufferGeometry>,
  vertexCount: number,
  maxPolyCount: number,
) => {
  geometry.current.setDrawRange(0, vertexCount)

  geometry.current.getAttribute('position').needsUpdate = true
  geometry.current.getAttribute('normal').needsUpdate = true
  geometry.current.getAttribute('color').needsUpdate = true

  if (vertexCount / 3 > maxPolyCount) {
    // eslint-disable-next-line no-console
    console.warn(
      'Metaballs: Generated mesh exceeded maxPolyCount. Please increase maxPolyCount.',
    )
  }
}

export const reset = (caches: Caches, sizeXYZ: number) => {
  for (let i = 0; i < sizeXYZ; i++) {
    caches.field[i] = 0
    caches.normalCache[i * 3] = 0
    caches.palette[i * 3] =
      caches.palette[i * 3 + 1] =
      caches.palette[i * 3 + 2] =
        0
  }
}

export const addBalls = (
  dt: number,
  numBalls: number,
  balls: React.MutableRefObject<Ball[]>,
  velocity: number,
  strength: number,
  subtract: number,
  aspectX: number,
  aspectY: number,
  aspectZ: number,
) => {
  if (numBalls !== balls.current.length) {
    if (balls.current.length < numBalls) {
      balls.current.push(
        ...Array.from({ length: numBalls }, () => {
          return {
            x: THREE.MathUtils.randFloat(0, aspectX),
            y: THREE.MathUtils.randFloat(0, aspectY),
            z: THREE.MathUtils.randFloat(0, aspectZ),
            vx:
              Math.random() < 0.5
                ? THREE.MathUtils.randFloat(-velocity, -velocity * 0.75)
                : THREE.MathUtils.randFloat(velocity * 0.75, velocity),
            vy:
              Math.random() < 0.5
                ? THREE.MathUtils.randFloat(-velocity, -velocity * 0.75)
                : THREE.MathUtils.randFloat(velocity * 0.75, velocity),
            vz: 0,
          }
        }),
      )
    }

    if (balls.current.length > numBalls) {
      balls.current.splice(0, numBalls)
    }
  }

  // Update the positions of the balls based on their velocity and boundaries
  balls.current.forEach((ball) => {
    const { x, y, z, vx, vy, vz } = ball

    const offset = Math.sqrt(strength / subtract) / 1.25

    const minX = offset
    const maxX = aspectX - offset
    const minY = offset
    const maxY = aspectY - offset
    const minZ = 0
    const maxZ = aspectZ / 1.5 - offset

    ball.x += vx * dt
    ball.y += vy * dt
    ball.z += vz * dt

    if (x < minX) {
      ball.x = minX
      ball.vx = -vx
    }
    if (x > maxX) {
      ball.x = maxX
      ball.vx = -vx
    }
    if (y < minY) {
      ball.y = minY
      ball.vy = -vy
    }
    if (y > maxY) {
      ball.y = maxY
      ball.vy = -vy
    }
    if (z < minZ) {
      ball.z = minZ
      ball.vz = -vz
    }
    if (z > maxZ) {
      ball.z = maxZ
      ball.vz = -vz
    }
  })
}
