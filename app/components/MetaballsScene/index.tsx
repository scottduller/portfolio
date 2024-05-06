'use client'

import { Canvas } from '@react-three/fiber'
import MetaballsScene from './MetaballsScene'

const Scene = () => {
  //TODO: Go through each child and find where the reload is occuring
  return (
    <Canvas dpr={1} className="canvas">
      <MetaballsScene
        numBalls={8}
        velocity={0.15}
        maxPolyCount={100000}
        enableColors={true}
      />
    </Canvas>
  )
}

export default Scene
