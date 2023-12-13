'use client'

import { MarchingCube } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'
import { CatmullRomCurve3, Group, Vector3 } from 'three'
import { MetaballProps } from '.'
import random from 'lodash.random'

const Metaball = ({
  radiusRatio = 16 / 9,
  radiusMultiplier = 1,
  noiseIntensity = 0.1,
  speed = 1,
  xOffset = 0,
}: MetaballProps) => {
  const cubeRef = useRef<Group>(null!)

  const points = useMemo(() => {
    const path = []
    const numPoints = 1000

    const invertedX = Math.random() > 0.5 ? 1 : -1
    const invertedY = Math.random() > 0.5 ? 1 : -1
    const invertedZ = Math.random() > 0.5 ? 1 : -1

    const noise = createNoise2D()

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI

      const noiseVal = noise(Math.cos(t), Math.sin(t))

      const xr = radiusRatio * radiusMultiplier + noiseVal * noiseIntensity
      const yr = radiusMultiplier + noiseVal * noiseIntensity
      const zr = 0.2 * noiseVal

      const x = invertedX * xr * Math.cos(t)
      const y = invertedY * yr * Math.sin(t)
      const z = invertedZ * zr

      path.push(new Vector3(x, y, z))
    }

    return path
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const path = useMemo(() => {
    const curve = new CatmullRomCurve3(points, true, 'catmullrom', 0.9)
    return curve.getPoints(500)
  }, [points])

  const pathIndex = useRef(0)
  const offsetVec = useMemo(() => new Vector3(xOffset, 0, 0), [xOffset])
  const speedOffset = useRef(random(0.9, 1.1, true))

  let nextPoint = path[pathIndex.current].clone().add(offsetVec)

  useFrame((state, dt) => {
    cubeRef.current.position.lerp(nextPoint, speed * speedOffset.current * dt)

    if (cubeRef.current.position.distanceTo(nextPoint) < 0.1) {
      pathIndex.current = (pathIndex.current + 1) % path.length
      nextPoint = path[pathIndex.current].clone().add(offsetVec)
    }
  })

  const flyInPos = useMemo(() => {
    return new Vector3(
      xOffset + (Math.random() * (3 - 1.5) + 1.5) * Math.random() > 0.5
        ? 1
        : -1,
      (Math.random() * (3 - 1.5) + 1.5) * Math.random() > 0.5 ? 1 : -1,
      (Math.random() * (3 - 1.5) + 1.5) * Math.random() > 0.5 ? 1 : -1,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MarchingCube
        position={flyInPos}
        ref={cubeRef}
        strength={0.35}
        subtract={12}
      />
    </>
  )
}

export default Metaball
