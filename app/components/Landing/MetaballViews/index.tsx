import { Bounds, PerspectiveCamera } from '@react-three/drei'
import React, { useMemo } from 'react'
import Metaballs from '../../Metaballs'
import { useThree } from '@react-three/fiber'

const HeroView = () => {
  return (
    <>
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 2]} />

      {/* <OrbitControls /> */}
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 3]} intensity={3} />

      <Metaballs
        xRadius={0.5}
        yRadius={0.15}
        spacingMultiplier={0.1}
        noiseIntensity={0.2}
        speed={5}
        // fixedNumBalls={1}
      />

      <Bounds fit observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </>
  )
}

const AboutProjectsView = () => {
  const { viewport } = useThree()

  const { width, height } = viewport

  const diagonal = useMemo(
    () => Math.sqrt(width ** 2 + height ** 2),
    [width, height],
  )

  const diagonalAngle = useMemo(
    () => Math.atan(width / height),
    [width, height],
  )

  console.log({ diagonal, diagonalAngle })

  return (
    <>
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 1]} />

      {/* <OrbitControls /> */}
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 3]} intensity={3} />

      <Metaballs
        spacingMultiplier={0.1}
        xRadius={0.125}
        yRadius={0.9}
        noiseIntensity={0.2}
        speed={1.8}
        rotation={-diagonalAngle - Math.PI / 12}
        numBallsMultiplier={1.75}
      />

      <Bounds fit observe margin={1.5}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </>
  )
}

const ContactView = () => {
  return (
    <>
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 1]} />

      {/* <OrbitControls /> */}
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 3]} intensity={3} />

      <Metaballs
        spacingMultiplier={0.2}
        xRadius={3.5}
        yRadius={2.25}
        noiseIntensity={0.2}
        speed={1.8}
        fixedNumBalls={3}
      />

      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </>
  )
}

export { HeroView, AboutProjectsView, ContactView }
