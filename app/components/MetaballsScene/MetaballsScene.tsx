import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import Metaballs from './Metaballs'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export type Ball = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

type MetaballsSceneProps = {
  numBalls: number
  velocity: number
  maxPolyCount: number
  enableColors: boolean
}

const MetaballsScene = ({
  numBalls,
  velocity,
  maxPolyCount,
  enableColors,
}: MetaballsSceneProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  const { width, height } = useWindowDimensions()
  const oldSize = useRef({ width, height })

  const balls = useRef<Ball[]>([])

  const { aspect, aspectX, aspectY, aspectZ } = useMemo(() => {
    const aspect = width / height

    if (balls.current.length !== 0) {
      balls.current = balls.current.map((ball) => {
        return {
          x: ball.x * (width / oldSize.current.width),
          y: ball.y * (height / oldSize.current.height),
          z: ball.z,
          vx: ball.vx,
          vy: ball.vy,
          vz: ball.vz,
        }
      })
      oldSize.current = { width, height }
    }

    if (width > height) {
      return {
        aspect: aspect,
        aspectX: aspect,
        aspectY: 1,
        aspectZ: 0.5,
      }
    }
    if (height > width) {
      return {
        aspect: aspect,
        aspectX: Math.max(aspect, 0.8),
        aspectY: Math.min(1 / aspect, 1.25),
        aspectZ: 0.5,
      }
    }
    return { aspect, aspectX: 1, aspectY: 1, aspectZ: 0.5 }
  }, [width, height])

  const subtract = 21
  const strength = useMemo(
    () => (2 * Math.sqrt(aspect)) / ((Math.sqrt(numBalls) - 1) / 4 + 1),
    [aspect, numBalls],
  )

  const generateBalls = (numBalls: number, v: number) =>
    Array.from({ length: numBalls }, () => {
      return {
        x: THREE.MathUtils.randFloat(0, aspectX),
        y: THREE.MathUtils.randFloat(0, aspectY),
        z: THREE.MathUtils.randFloat(0, aspectZ),
        vx:
          Math.random() < 0.5
            ? THREE.MathUtils.randFloat(-v, -v * 0.75)
            : THREE.MathUtils.randFloat(v * 0.75, v),
        vy:
          Math.random() < 0.5
            ? THREE.MathUtils.randFloat(-v, -v * 0.75)
            : THREE.MathUtils.randFloat(v * 0.75, v),
        vz: 0,
      }
    })

  const addBalls = (
    dt: number,
    numBalls: number,
    strength: number,
    subtract: number,
  ) => {
    if (numBalls !== balls.current.length) {
      if (balls.current.length < numBalls) {
        balls.current.push(
          ...generateBalls(numBalls - balls.current.length, velocity),
        )
      }

      if (balls.current.length > numBalls) {
        balls.current = balls.current.slice(0, numBalls)
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

    return balls.current
  }

  const pointLight = useRef<THREE.PointLight>(null!)

  const viewAngle = 10
  const cameraAspect = width / height
  const near = 0.01
  const far = 10000

  const {
    viewport: { width: vpWidth, height: vpHeight },
  } = useThree()

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={viewAngle}
        aspect={cameraAspect}
        near={near}
        far={far}
        position={[0, 0, 100]}
      />

      <color attach="background" args={['#191716']} />

      <EffectComposer resolutionScale={0.5}>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.05}
          intensity={2}
          mipmapBlur
        />
      </EffectComposer>

      <ambientLight intensity={0.7} />
      <pointLight
        ref={pointLight}
        intensity={100}
        color="white"
        position={[(-vpWidth * 0.9) / 2, (vpHeight * 0.9) / 2, 10]}
      />
      <pointLight
        ref={pointLight}
        intensity={200}
        color="white"
        position={[(vpWidth * 0.85) / 2, (-vpHeight * 0.85) / 2, 10]}
      />
      <Metaballs
        meshRef={meshRef}
        scale={16}
        position={[0, 0, 0]}
        numBalls={numBalls}
        addBalls={addBalls}
        subtract={subtract}
        strength={strength}
        aspectX={aspectX}
        aspectY={aspectY}
        aspectZ={aspectZ}
        enableColors={enableColors}
        maxPolyCount={maxPolyCount}
      />
    </>
  )
}

export default MetaballsScene
