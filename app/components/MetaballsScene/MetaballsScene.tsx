import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import Metaballs from './Metaballs'
import { lerp, lerpVelocityFactor } from './utils'
import { useScroll } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import useWindowDimensions from '@/hooks/useWindowDimensions'

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
  const initialVelocity = useRef(velocity)

  const meshRef = useRef<THREE.Mesh>(null!)

  const scroll = useScroll()

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
    return { aspect, aspectX: 1, aspectY: 1, aspectZ: 1 }
  }, [width, height])

  const adjVelocity = useMemo(() => {
    return velocity * Math.max(aspectX, aspectY)
  }, [velocity, aspectX, aspectY])

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
    const { pages } = scroll

    if (numBalls % 2 !== 0) {
      numBalls -= 1
    }

    const currentBalls = balls.current.map((ball) => {
      return {
        x: ball.x,
        y: ball.y,
        z: ball.z,
        vx: ball.vx,
        vy: ball.vy,
        vz: ball.vz,
      }
    })

    if (scroll.visible(0.1 / pages, 2 / pages)) {
      currentBalls.forEach((ball, i) => {
        const factor = scroll.range(0 / pages, 2 / pages, -0.1 / pages)

        const leftX = (aspectX - aspect) / 2
        const rightX = aspectX - leftX

        const finalX = i < numBalls / 2 ? leftX : rightX
        const finalY = ball.y

        const newX = lerp(balls.current[i].x, finalX, factor)
        const newY = lerp(balls.current[i].y, finalY, factor)

        currentBalls[i] = { ...ball, x: newX, y: newY }
      })

      return currentBalls
    }

    if (initialVelocity.current !== adjVelocity) {
      balls.current.forEach((ball) => {
        ball.vx =
          THREE.MathUtils.randFloat(adjVelocity * 0.75, adjVelocity) *
          Math.sign(ball.vx)
        ball.vy =
          THREE.MathUtils.randFloat(adjVelocity * 0.75, adjVelocity) *
          Math.sign(ball.vy)
        ball.vz = 0
      })

      initialVelocity.current = adjVelocity
    }

    if (numBalls !== balls.current.length) {
      if (balls.current.length < adjVelocity) {
        balls.current.push(
          ...generateBalls(numBalls - balls.current.length, adjVelocity),
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

      const xVFactor = lerpVelocityFactor(x, 0, aspectX, 0.2 * aspectX, 1)
      const yVFactor = lerpVelocityFactor(y, 0, aspectY, 0.2 * aspectY, 1)
      const zVFactor = lerpVelocityFactor(z, 0, aspectZ, 0.2 * aspectZ, 1)

      const vFactor = Math.min(xVFactor, yVFactor, zVFactor) * dt

      ball.x += vx * vFactor
      ball.y += vy * vFactor
      ball.z += vz * vFactor

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

  return (
    <>
      {/* <pointLight intensity={10} position={[aspectX, aspectY, aspectZ * 2]} /> */}
      <pointLight intensity={10} position={[0, aspectY * 2, aspectZ * 4]} />
      <Metaballs
        meshRef={meshRef}
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
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.05}
          intensity={1}
          blendFunction={BlendFunction.SCREEN}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default MetaballsScene
