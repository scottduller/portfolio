import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const HeroText = () => {
  const fontUrl = 'fonts/BarlowSemiCondensed-Bold.ttf'

  const { camera } = useThree()

  const textRef = useRef<THREE.Mesh>(null!)
  const outlineRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    const transformOutlineText = () => {
      const dText = camera.position.distanceTo(textRef.current.position)
      const dOutline = dText - 1 // 1 is the increase in Z coordinate
      const scale = dOutline / dText

      // Apply the scale factor to outlineRef
      outlineRef.current.scale.set(scale, scale, scale)

      // Set the position of outlineRef to be the same as textRef
      outlineRef.current.position.copy(textRef.current.position)

      // Move outlineRef slightly towards the camera along the camera's viewing direction
      const direction = new THREE.Vector3()
        .subVectors(camera.position, textRef.current.position)
        .normalize()
      outlineRef.current.position.add(direction)
    }

    transformOutlineText()

    window.addEventListener('resize', transformOutlineText)

    return () => {
      window.removeEventListener('resize', transformOutlineText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const textProps = {
    font: fontUrl,
    color: '#dbcdc6',
    fontSize: 0.15,
    strokeColor: '#dbcdc6',
  }

  return (
    <>
      <group>
        <Text
          ref={textRef}
          anchorX={'center'}
          anchorY={'middle'}
          position={[0, 0, 0]}
          {...textProps}
        >
          SCOTT DULLER
        </Text>
        <Text
          ref={outlineRef}
          anchorX={'center'}
          anchorY={'middle'}
          fillOpacity={0}
          strokeOpacity={1}
          strokeWidth={0.003}
          position-z={1}
          {...textProps}
        >
          SCOTT DULLER
        </Text>
      </group>
      {/* <Html wrapperClass="hero__content" position={[0, 0, 0]}>
        <p>
          <strong>SCOTT DULLER</strong>
          <span className="vertical" />
          <span>FULL STACK WEB DEVELOPER</span>
        </p>
      </Html> */}
    </>
  )
}

export default HeroText
