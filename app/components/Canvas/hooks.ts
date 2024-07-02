import { useMemo, useRef } from 'react'
import { useWindowSize } from '@react-hookz/web'
import { Ball } from './Metaballs'

export const useAspect = (balls: React.MutableRefObject<Ball[]>) => {
  const { width, height } = useWindowSize()
  const oldSize = useRef({ width, height })

  const { aspect, aspectX, aspectY, aspectZ } = useMemo(() => {
    const aspect = width / height

    if (balls.current.length !== 0) {
      balls.current = balls.current.map((ball) => {
        return {
          x: ball.x * (width / oldSize.current.width),
          y: ball.y * (height / oldSize.current.height),
          z: ball.z,
          vx: ball.vx,
          vy: ball.vy,
          vz: ball.vz,
        }
      })
      oldSize.current = { width, height }
    }

    if (width > height) {
      return {
        aspect: aspect,
        aspectX: aspect,
        aspectY: 1,
        aspectZ: 0.5,
      }
    }
    if (height > width) {
      return {
        aspect: aspect,
        aspectX: Math.max(aspect, 0.8),
        aspectY: Math.min(1 / aspect, 1.25),
        aspectZ: 0.5,
      }
    }
    return { aspect, aspectX: 1, aspectY: 1, aspectZ: 0.5 }
    // eslint-disable-next-line
  }, [width, height])

  return { aspect, aspectX, aspectY, aspectZ }
}
