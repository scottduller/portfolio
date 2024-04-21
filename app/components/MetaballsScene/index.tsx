'use client'

import { Canvas } from '@react-three/fiber'
import MetaballsScene from './MetaballsScene'
import { PerspectiveCamera } from '@react-three/drei'
import useWindowDimensions from '@/hooks/useWindowDimensions'

const Scene = () => {
  const { width, height } = useWindowDimensions()

  const viewAngle = 10
  const cameraAspect = width / height
  const near = 0.01
  const far = 10000

  return (
    <Canvas dpr={0.5} className="canvas">
      <PerspectiveCamera
        makeDefault
        fov={viewAngle}
        aspect={cameraAspect}
        near={near}
        far={far}
        position={[0, 0, 5.5]}
      />

      <ambientLight intensity={0.75} />

      <color attach="background" args={['#191716']} />

      <MetaballsScene
        numBalls={8}
        velocity={0.2}
        maxPolyCount={100000}
        enableColors={true}
      />
    </Canvas>
  )
}

export default Scene
