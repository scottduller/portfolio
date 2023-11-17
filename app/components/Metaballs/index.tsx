'use client'

import { GradientTexture, MarchingCubes } from '@react-three/drei'
import Metaball from './Metaball'
import { useEffect, useMemo, useState } from 'react'
import { Vector2 } from 'three'
import linspace from '@stdlib/array-linspace'
import { useThree } from '@react-three/fiber'

export type MetaballProps = {
  xRadius: number
  yRadius: number
  zRadius: number
  noiseIntensity: number
  speed: number
  numBalls?: number
  margin?: number
}

const Metaballs = (props: MetaballProps) => {
  const [spacing, setSpacing] = useState<number[]>([])
  const [numBalls, setNumBalls] = useState<number>(props.numBalls || 5)

  const { viewport } = useThree()
  const numBallsAtWidth = linspace(320, 3440, 16, { dtype: 'generic' })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const calculatedNumBalls = numBallsAtWidth.reduce((prev, curr, i) => {
        if (width > curr) {
          return i + 1
        }

        return prev
      }, 0)

      if (calculatedNumBalls > 5) {
        setNumBalls(calculatedNumBalls)
      }
    }

    if (!props.numBalls) {
      handleResize()
      window.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [numBallsAtWidth, props.numBalls])

  useEffect(() => {
    if (numBalls === 1) {
      setSpacing([0])
    } else {
      setSpacing(
        linspace(-viewport.width * 0.2, viewport.width * 0.2, numBalls, {
          dtype: 'generic',
        }),
      )
    }
  }, [numBalls, viewport.width])

  return (
    <>
      <MarchingCubes resolution={80} maxPolyCount={20000} enableUvs={true}>
        <meshStandardMaterial>
          <GradientTexture
            stops={[0, 1]}
            colors={['#0B81BC', '#FF0000']}
            rotation={Math.PI / 2}
            center={useMemo(() => new Vector2(0.6, 0), [])}
          />
        </meshStandardMaterial>
        {spacing.map((x, i) => (
          <Metaball key={i} initPos={[0, 0, 0]} xOffset={x} {...props} />
        ))}
      </MarchingCubes>
    </>
  )
}

export default Metaballs
