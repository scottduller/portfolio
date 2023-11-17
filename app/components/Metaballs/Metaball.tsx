'use client'

import { MarchingCube } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'
import { CatmullRomCurve3, Group, Vector3 } from 'three'
import { MetaballProps } from '.'
import random from 'lodash.random'

const Metaball = (
  props: MetaballProps & { initPos: [number, number, number]; xOffset: number },
) => {
  const { xRadius, yRadius, zRadius, noiseIntensity, speed, initPos, xOffset } =
    props

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

      const xr = xRadius + noiseVal * noiseIntensity
      const yr = yRadius + noiseVal * noiseIntensity
      const zr = zRadius * noiseVal

      const x = initPos[0] + invertedX * xr * Math.cos(t)
      const y = initPos[1] + invertedY * yr * Math.sin(t)
      const z = initPos[2] + invertedZ * zr

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
      initPos[0] + xOffset + (Math.random() * (3 - 1.5) + 1.5) * Math.random() >
      0.5
        ? 1
        : -1,
      initPos[1] + (Math.random() * (3 - 1.5) + 1.5) * Math.random() > 0.5
        ? 1
        : -1,
      initPos[2] + (Math.random() * (3 - 1.5) + 1.5) * Math.random() > 0.5
        ? 1
        : -1,
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
