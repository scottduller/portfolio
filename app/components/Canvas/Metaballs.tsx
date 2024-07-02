import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { addBall } from './metaball'
import { PerformanceMonitor } from '@react-three/drei'
import useResizeDebounce from '@/hooks/useResizeDebouce'
import { useAspect } from './hooks'
import {
  addBalls,
  reset,
  update,
  updateGeometry,
  updateParameters,
} from './MetaballsFunctions'

export type MetaballsProps = {
  meshRef: React.MutableRefObject<THREE.Mesh>
  scale: number
  position: [number, number, number]
  numBalls: number
  velocity: number
  subtract: number
  strength: number
  maxPolyCount: number
}

export type Parameters = {
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
  buffers: Buffers
  caches: Caches
  deltas: Deltas
  arrays: Arrays
}

export type Ball = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

const Metaballs = ({
  meshRef,
  scale,
  position,
  numBalls,
  velocity,
  subtract,
  strength,
  maxPolyCount,
}: MetaballsProps) => {
  const balls = useRef<Ball[]>([])

  const { aspectX, aspectY, aspectZ } = useAspect(balls)

  const [resolution, setResolution] = useState(50)
  const [oldResolution, setOldResolution] = useState(50)

  const [perfMonitorKey, setPerfMonitorKey] = useState(0)

  const vertexCount = useRef<number>(0)

  const geometryRef = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry())

  const materialRef = useRef<THREE.Material>(
    new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 10,
      toneMapped: false,
    }),
  )

  const parameters = useMemo(
    () =>
      updateParameters(
        resolution,
        aspectX,
        aspectY,
        aspectZ,
        subtract,
        strength,
        maxPolyCount,
        geometryRef,
      ),
    [resolution, aspectX, aspectY, aspectZ, subtract, strength, maxPolyCount],
  )

  useFrame((_, dt) => {
    const { buffers, caches, deltas, arrays, params } = parameters

    // console.log(params)

    addBalls(
      dt,
      numBalls,
      balls,
      velocity,
      strength,
      subtract,
      aspectX,
      aspectY,
      aspectZ,
    )

    balls.current.forEach((ball) => {
      addBall(ball.x, ball.y, ball.z, strength, subtract, aspectX, {
        buffers,
        caches,
        deltas,
        arrays,
        params,
      })
    })

    update(
      params,
      aspectX,
      aspectY,
      aspectZ,
      deltas,
      caches,
      arrays,
      buffers,
      vertexCount,
    )

    // console.log(caches.field.findIndex((v) => v !== 0))

    updateGeometry(geometryRef, vertexCount.current, maxPolyCount)

    reset(caches, params.sizeXYZ)
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
        onChange={({ factor }) => {
          setOldResolution(resolution)
          setResolution(() => {
            return Math.ceil(100 * factor)
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
