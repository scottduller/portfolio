'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const { x: mouseX, y: mouseY } = cursorPos

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    document.addEventListener('mousemove', (e) => {
      setCursorPos({ x: e.pageX, y: e.pageY })
    })

    document.addEventListener('mousedown', () => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.classList.add('active')
        cursorDotRef.current.classList.add('active')
      }
    })

    document.addEventListener('mouseup', () => {
      if (cursorRef.current && cursorDotRef.current) {
        setTimeout(() => {
          cursorRef.current?.classList.remove('active')
          cursorDotRef.current?.classList.remove('active')
        }, 500)
      }
    })
  }, [])

  useLayoutEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      cursorRef.current.style.left = `${mouseX}px`
      cursorDotRef.current.style.left = `${mouseX}px`
      cursorRef.current.style.top = `${mouseY}px`
      cursorDotRef.current.style.top = `${mouseY}px`
    }
  }, [mouseX, mouseY])

  if (isTouchDevice) return null

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-dot" ref={cursorDotRef} />
    </>
  )
}

export default Cursor
