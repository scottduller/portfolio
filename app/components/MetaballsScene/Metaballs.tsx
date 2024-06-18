import { invalidate, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { normBetween } from './utils'
import { polygonise } from './polygonise'
import { addBall } from './metaball'
import { Ball } from './MetaballsScene'
import { PerformanceMonitor } from '@react-three/drei'
import useResizeDebounce from '@/hooks/useResizeDebouce'

export type MetaballsProps = {
  meshRef: React.MutableRefObject<THREE.Mesh>
  scale: number
  position: [number, number, number]
  numBalls: number
  addBalls: (
    dt: number,
    numBalls: number,
    strength: number,
    subtract: number,
  ) => Ball[]
  subtract: number
  strength: number
  aspectX: number
  aspectY: number
  aspectZ: number
  enableColors: boolean
  maxPolyCount: number
}

export type Parameters = {
  resolution: number
  isol: number
  size: number
  sizeX: number
  sizeY: number
  sizeZ: number
  sizeXY: number
  sizeXYZ: number
  halfSize: number
  subtract: number
  strength: number
}

export type Deltas = {
  deltaX: number
  deltaY: number
  deltaZ: number
  yOffset: number
  zOffset: number
}

export type Caches = {
  field: Float32Array
  normalCache: Float32Array
  palette: Float32Array
}

export type Buffers = {
  vList: Float32Array
  nList: Float32Array
  cList: Float32Array
}

export type Arrays = {
  positionArray: Float32Array
  normalArray: Float32Array
  colorArray?: Float32Array
}

export type State = {
  buffers: React.MutableRefObject<Buffers>
  caches: React.MutableRefObject<Caches | undefined>
  deltaValues: React.MutableRefObject<Deltas | undefined>
  arrays: React.MutableRefObject<Arrays | undefined>
  vertexCount: React.MutableRefObject<number>
  enableColors: React.MutableRefObject<boolean>
}

const Metaballs = ({
  meshRef,
  scale,
  position,
  numBalls,
  addBalls,
  subtract,
  strength,
  aspectX,
  aspectY,
  aspectZ,
  enableColors: enableColorsProp,
  maxPolyCount,
}: MetaballsProps) => {
  const [resolution, setResolution] = useState(50)
  const [oldResolution, setOldResolution] = useState(50)

  const [perfMonitorKey, setPerfMonitorKey] = useState(0)

  const geometryRef = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry())

  const materialRef = useRef<THREE.Material>(
    new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 10,
      toneMapped: false,
    }),
  )

  const parameters = useRef<Parameters | undefined>()
  const deltaValues = useRef<Deltas | undefined>()
  const caches = useRef<Caches | undefined>()
  const arrays = useRef<Arrays | undefined>()
  const vertexCount = useRef<number>(0)
  const buffers = useRef<Buffers>({
    vList: new Float32Array(12 * 3),
    nList: new Float32Array(12 * 3),
    cList: new Float32Array(12 * 3),
  })
  const enableColors = useRef<boolean>(enableColorsProp)
  const isGeometryInitialised = useRef<boolean>(false)

  const { sizeX, sizeY, sizeZ } = useMemo(() => {
    return {
      sizeX: Math.ceil(resolution * aspectX),
      sizeY: Math.ceil(resolution * aspectY),
      sizeZ: Math.floor(resolution * aspectZ),
    }
  }, [resolution, aspectX, aspectY, aspectZ])

  const initialiseParameters = () => {
    // Initialize variables for ball parameters

    const size = resolution
    const sizeXY = sizeX * sizeY
    const sizeXYZ = sizeXY * sizeZ
    const halfSize = size / 2

    // Set parameters for the Metaballs scene
    parameters.current = {
      resolution: resolution,
      isol: 80,
      size: size,
      sizeX: sizeX,
      sizeY: sizeY,
      sizeZ: sizeZ,
      sizeXY: sizeXY,
      sizeXYZ: sizeXYZ,
      halfSize: halfSize,
      subtract: subtract,
      strength: strength,
    } as Parameters

    enableColors.current = enableColorsProp

    // Set delta values for calculations
    deltaValues.current = {
      deltaX: aspectX / sizeX,
      deltaY: aspectY / sizeY,
      deltaZ: aspectZ / sizeZ,
      yOffset: sizeX,
      zOffset: sizeXY,
    }

    // Initialize caches for field, normal, and palette
    caches.current = {
      field: new Float32Array(sizeXYZ * 3),
      normalCache: new Float32Array(sizeXYZ * 3),
      palette: new Float32Array(sizeXYZ * 3),
    }

    geometryRef.current!.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(),
      1,
    )
  }

  const initialiseGeometry = () => {
    const geometry = geometryRef.current

    vertexCount.current = 0

    const maxVertexCount = maxPolyCount * 3

    // Initialize arrays for position and normal attributes
    arrays.current = {
      positionArray: new Float32Array(maxVertexCount * 3),
      normalArray: new Float32Array(maxVertexCount * 3),
    } as Arrays

    // Set position attribute for the mesh geometry
    const positionsAttribute = new THREE.BufferAttribute(
      arrays.current.positionArray,
      3,
    )
    positionsAttribute.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute('position', positionsAttribute)

    // Set normal attribute for the mesh geometry
    const normalsAttribute = new THREE.BufferAttribute(
      arrays.current.normalArray,
      3,
    )
    normalsAttribute.setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute('normal', normalsAttribute)

    // Set color attribute for the mesh geometry if colors are enabled
    if (enableColors.current) {
      arrays.current.colorArray = new Float32Array(maxVertexCount * 3)
      const colorsAttribute = new THREE.BufferAttribute(
        arrays.current.colorArray,
        3,
      )
      colorsAttribute.setUsage(THREE.DynamicDrawUsage)
      geometry.setAttribute('color', colorsAttribute)
    }

    isGeometryInitialised.current = true
  }

  const reset = () => {
    for (let i = 0; i < parameters.current!.sizeXYZ; i++) {
      caches.current!.field[i] = 0
      caches.current!.normalCache[i * 3] = 0
      caches.current!.palette[i * 3] =
        caches.current!.palette[i * 3 + 1] =
        caches.current!.palette[i * 3 + 2] =
          0
    }
  }

  const update = () => {
    vertexCount.current = 0

    const { isol, sizeX, sizeXY, sizeY, sizeZ } = parameters.current!
    const geometry = geometryRef.current!

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

          polygonise(dx, dy, dz, q, isol, {
            buffers,
            caches,
            deltaValues,
            arrays,
            vertexCount,
            enableColors,
          })
        }
      }
    }

    // Set the draw range for the mesh geometry
    geometry.setDrawRange(0, vertexCount.current)

    geometry.getAttribute('position').needsUpdate = true
    geometry.getAttribute('normal').needsUpdate = true

    if (enableColors.current) {
      geometry.getAttribute('color').needsUpdate = true
    }

    // Check if the generated mesh exceeds the maximum polygon count
    if (vertexCount.current / 3 > maxPolyCount) {
      // eslint-disable-next-line no-console
      console.warn(
        'Metaballs: Generated mesh exceeded maxPolyCount. Please increase maxPolyCount.',
      )
    }
  }

  useEffect(() => {
    invalidate()
    isGeometryInitialised.current = false
  }, [maxPolyCount, enableColorsProp])

  useFrame((state, dt) => {
    initialiseParameters()
    if (!isGeometryInitialised.current) {
      initialiseGeometry()
    }

    reset()

    const balls = addBalls(dt, numBalls, strength, subtract)

    balls.forEach((ball) => {
      addBall(ball.x, ball.y, ball.z, strength, subtract, aspectX, {
        buffers,
        caches,
        deltaValues,
        arrays,
        vertexCount,
        enableColors,
        parameters,
      })
    })

    update()
  }, -1)

  useResizeDebounce(() => {
    setResolution(50)
    setPerfMonitorKey((prev) => prev + 1)
  }, 1000)

  return (
    <>
      <PerformanceMonitor
        key={perfMonitorKey}
        factor={0.5}
        step={0.1}
        bounds={() => [30, 60]}
        onChange={({ factor }) => {
          setOldResolution(resolution)
          setResolution(() => {
            return 100 * factor
          })
        }}
        flipflops={5}
        onFallback={() => {
          setResolution(resolution > oldResolution ? oldResolution : resolution)
        }}
      />

      <mesh
        geometry={geometryRef.current}
        material={materialRef.current}
        ref={meshRef}
        position={position}
        scale={[scale, scale, scale]}
      />
    </>
  )
}

export default Metaballs
