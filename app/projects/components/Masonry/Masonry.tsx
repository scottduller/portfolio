import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { MasonryProvider } from './MasonryProvider'
import { useMasonry } from './useMasonry'
import { useWindowSize } from '@react-hookz/web'

const Container = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

type Breakpoints = Record<number, number>

type MasonryProps = {
  children: React.ReactNode
  columns: number | Breakpoints
  forceOrder?: boolean
  gap?: number
}

const Masonry = ({ children, columns, forceOrder, gap }: MasonryProps) => {
  return (
    <MasonryProvider>
      <MasonryContainer forceOrder={forceOrder} gap={gap} columns={columns}>
        {children}
      </MasonryContainer>
    </MasonryProvider>
  )
}

const MasonryContainer = ({
  children,
  columns,
  forceOrder = false,
  gap = 16,
}: MasonryProps) => {
  const { containerHeight, setMasonryOptions } = useMasonry()

  const containerSize = useWindowSize()

  const getColumns = (columns: number | Breakpoints) => {
    if (typeof columns === 'number') {
      return columns
    }

    if (containerSize) {
      const sortedColumns = Object.keys(columns)
        .map((key) => parseInt(key))
        .sort((a, b) => a - b)
      for (let i = 0; i < sortedColumns.length; i++) {
        if (containerSize.width < sortedColumns[i]) {
          return columns[sortedColumns[i]]
        }
      }
      return columns[sortedColumns[sortedColumns.length - 1]]
    }
    return 1
  }

  useLayoutEffect(() => {
    const columnCount = getColumns(columns)

    setMasonryOptions(columnCount, forceOrder, gap)

    if (window.scrollY < window.innerHeight) {
      window.scrollTo(0, 0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize, forceOrder, gap])

  return <Container $height={containerHeight}>{children}</Container>
}

export { Masonry }
export type { Breakpoints }
