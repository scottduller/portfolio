'use client'

import { GradientTexture, MarchingCubes } from '@react-three/drei'
import Metaball from './Metaball'
import { useEffect, useMemo, useState } from 'react'
import { Vector2 } from 'three'
import linspace from '@stdlib/array-linspace'
import { useThree } from '@react-three/fiber'

export type MetaballsProps = {
  spacingMultiplier: number
  fixedNumBalls?: number
}

export type MetaballProps = {
  radiusRatio: number
  radiusMultiplier: number
  noiseIntensity: number
  speed: number
  xOffset: number
}

const Metaballs = ({
  spacingMultiplier = 0.2,
  fixedNumBalls,
  ...props
}: MetaballsProps & Omit<MetaballProps, 'xOffset'>) => {
  const [spacing, setSpacing] = useState<number[]>([])
  const [numBalls, setNumBalls] = useState<number>(fixedNumBalls || 5)

  const { viewport } = useThree()
  const numBallsAtWidth = linspace(320, 3440, 16, { dtype: 'generic' })

  useEffect(() => {
    const handleWindowResize = () => {
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

    if (!fixedNumBalls) {
      handleWindowResize()
      window.addEventListener('resize', handleWindowResize)
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [fixedNumBalls, numBallsAtWidth])

  useEffect(() => {
    if (numBalls === 1) {
      setSpacing([0])
    } else {
      setSpacing(
        linspace(
          -viewport.width * spacingMultiplier,
          viewport.width * spacingMultiplier,
          numBalls,
          {
            dtype: 'generic',
          },
        ),
      )
    }
  }, [numBalls, spacingMultiplier, viewport.width])

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
          <Metaball key={i} xOffset={x} {...props} />
        ))}
      </MarchingCubes>
    </>
  )
}

export default Metaballs
