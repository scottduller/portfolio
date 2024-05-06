'use client'

import { ReactNode, useEffect, useState, Children, useMemo } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
  containerClassName?: string
  containerStyle?: React.CSSProperties
  columnClassName?: string
  columnStyle?: React.CSSProperties
  responsive?: boolean
  columnCountBreakPoints?: { [key: number]: number }
  columnCount?: number
  columnGap?: React.CSSProperties['gap']
  rowGap?: React.CSSProperties['gap']
}

const Container = styled.div<{
  $gap?: React.CSSProperties['gap']
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: stretch;
  box-sizing: border-box;
  width: 100%;
  gap: ${(props) => props.$gap};
`

const Column = styled.div<{
  $gap?: React.CSSProperties['gap']
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  flex: 1;
  width: 0;
  gap: ${(props) => props.$gap};
`

const useWindowWidth = () => {
  const getWindowWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth
    }
    return 0
  }

  const [windowWidth, setWindowWidth] = useState(getWindowWidth())
  useEffect(() => {
    const handleResize = () => setWindowWidth(getWindowWidth())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width: windowWidth }
}

const Masonry = ({
  children,
  containerClassName,
  containerStyle,
  columnClassName,
  columnStyle,
  responsive = true,
  columnCountBreakPoints = { 0: 1, 768: 2, 1024: 3 },
  columnCount = 3,
  columnGap = '1rem',
  rowGap = '1rem',
}: Props) => {
  const { width } = useWindowWidth()

  const responsiveColumns = useMemo(() => {
    if (!responsive) {
      return []
    }
    const sortedBreakPoints = Object.keys(columnCountBreakPoints).sort(
      (a, b) => parseInt(a) - parseInt(b),
    )

    const responsiveColumnCount = sortedBreakPoints.reduce(
      (acc, breakPoint) => {
        if (width >= parseInt(breakPoint)) {
          return columnCountBreakPoints[+breakPoint]
        }
        return acc
      },
      1,
    )
    const childArray = Children.toArray(children)
    return Array.from({ length: responsiveColumnCount }, () => []).map(
      (_, index) =>
        childArray.filter((_, i) => i % responsiveColumnCount === index),
    )
  }, [responsive, columnCountBreakPoints, children, width])

  const columns = useMemo(() => {
    if (responsive) {
      return []
    }
    return Array.from({ length: columnCount }, () => []).map((_, index) =>
      Children.toArray(children).filter((_, i) => i % columnCount === index),
    )
  }, [children, columnCount, responsive])

  const generateColumns = () => {
    if (responsive) {
      return responsiveColumns
    }
    return columns
  }

  return (
    <Container
      className={containerClassName}
      style={containerStyle}
      $gap={columnGap}
    >
      {generateColumns().map((column, index) => (
        <Column
          className={columnClassName}
          style={columnStyle}
          key={index}
          $gap={rowGap}
        >
          {column}
        </Column>
      ))}
    </Container>
  )
}

export default Masonry
