import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import Metaballs from './Metaballs'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { CameraControls, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

type MetaballsSceneProps = {
  numBalls: number
  velocity: number
  maxPolyCount: number
}

const MetaballsScene = ({
  numBalls,
  velocity,
  maxPolyCount,
}: MetaballsSceneProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  const {
    viewport: { width: vpWidth, height: vpHeight, aspect },
  } = useThree()
  const subtract = 21
  const strength = useMemo(
    () => (2 * Math.sqrt(aspect)) / ((Math.sqrt(numBalls) - 1) / 4 + 1),
    [aspect, numBalls],
  )

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={10}
        aspect={aspect}
        near={0.01}
        far={10000}
        position={[0, 0, 100]}
      />

      <CameraControls
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2}
      />

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
        intensity={100}
        color="red"
        position={[(-vpWidth * 0.9) / 2, (vpHeight * 0.9) / 2, 10]}
      />
      <pointLight
        intensity={200}
        color="blue"
        position={[(vpWidth * 0.85) / 2, (-vpHeight * 0.85) / 2, 10]}
      />

      <Metaballs
        maxPolyCount={maxPolyCount}
        numBalls={numBalls}
        velocity={velocity}
        subtract={subtract}
        strength={strength}
        meshRef={meshRef}
        scale={19}
        position={[0, 0, 0]}
      />
    </>
  )
}

export default MetaballsScene
