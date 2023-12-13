'use client'

import { Suspense, useState } from 'react'
import Metaballs from '../Metaballs'
import { Canvas } from '@react-three/fiber'
import {
  Bounds,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from '@react-three/drei'

const Hero = () => {
  const [test, setTest] = useState(false)

  const [, setPhysicsActive] = useState(false)

  const onMouseEnter = () => {
    console.log('enter')
    setPhysicsActive(true)
  }

  const onMouseLeave = () => {
    console.log('leave')
    setPhysicsActive(false)
  }

  return (
    <>
      <section className="hero">
        <button className="hero__menu-button" onClick={() => setTest(!test)} />
        {/* <div className="hero__menu-backdrop" /> */}

        <div className="hero__video">
          <Canvas>
            <Stats showPanel={0} />

            <PerspectiveCamera makeDefault fov={40} position={[0, 0, 1]} />

            <OrbitControls />
            <ambientLight intensity={2} />
            <directionalLight position={[0, 0, 3]} intensity={3} />

            <Suspense fallback={null}>
              <Metaballs
                spacingMultiplier={0.2}
                radiusRatio={16 / 8}
                radiusMultiplier={0.2}
                noiseIntensity={0.3}
                speed={1.2}
              />
            </Suspense>

            <Bounds fit clip observe margin={1.2}>
              <mesh visible={false}>
                <boxGeometry />
              </mesh>
            </Bounds>
          </Canvas>
        </div>
        {test && (
          <>
            <div className="hero__overlay">
              <h1
                className="hero__title-1"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {'SCOTT'.split('').map((letter, i) => {
                  return (
                    <span className="hero__title-letter" key={i}>
                      {letter}
                    </span>
                  )
                })}
              </h1>
              <h1
                className="hero__title-2"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {'DULLER'.split('').map((letter, i) => {
                  return (
                    <span className="hero__title-letter" key={i}>
                      {letter}
                    </span>
                  )
                })}
              </h1>
            </div>
            <p className="hero__subtitle">
              <strong>SCOTT DULLER</strong> | FULL STACK WEB DEVELOPER
            </p>
          </>
        )}
      </section>
    </>
  )
}

export default Hero
