import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import styled, { keyframes } from 'styled-components'
import { pxPercCalcSub } from './generateCalcString'
import { useMasonry } from './useMasonry'
import { MasonryItemType } from './types'
import { useMeasure } from '@react-hookz/web'

const appear = keyframes`
	from {
		scale: 0;
		opacity: 0;
	}
	to {
		scale: 1;
		opacity: 1;
	}
`

const Item = styled.div.attrs<{
  $height?: number
  $width?: string
  $top?: number
  $left?: string
  $gap?: number
}>((props) => ({
  style: {
    height: `${props.$height}px`,
    width: props.$width,
    top: `${props.$top}px`,
    left: props.$left,
  },
}))`
  transition:
    top 0.5s,
    left 0.5s,
    width 0.5s,
    height 0.5s;
  display: inline-block;
  position: absolute;
  animation: ${appear} 0.3s ease-out;
  will-change: top, left, width, height;
`

type MasonryItemProps = {
  children: React.ReactNode
  stretchColumns?: number | 'full'
  height?: number
}

export const MasonryItem = ({
  children,
  stretchColumns: stretchColumnsProp = 1,
  height,
}: MasonryItemProps) => {
  const { columnWidth, items, columnCount, gap, addItem, removeItem } =
    useMasonry()

  const id = useRef(uuid())

  const [currentItem, setCurrentItem] = useState<MasonryItemType>()

  const [itemSize, ref] = useMeasure()

  const stretchColumns =
    stretchColumnsProp === 'full'
      ? columnCount
      : Math.min(columnCount, stretchColumnsProp)

  const width = pxPercCalcSub(
    stretchColumns * columnWidth,
    ((columnCount - stretchColumns) * gap) / columnCount,
  )

  useLayoutEffect(() => {
    if (!itemSize) return

    const item = items.find((item) => item.id === id.current)

    let newItem: MasonryItemType

    if (item) {
      newItem = {
        ...item,
        height: itemSize.height,
        stretchColumns: stretchColumns,
      }

      if (item.height !== itemSize.height || width !== item.width) {
        addItem(newItem)
      }
    } else {
      newItem = {
        id: id.current,
        width: '0',
        height: itemSize.height,
        stretchColumns: stretchColumns,
        top: 0,
        left: '0',
      }

      addItem(newItem)
    }

    setCurrentItem(newItem)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnWidth, items, itemSize, stretchColumnsProp, width])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      removeItem(id.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Item
      ref={ref as React.RefObject<HTMLDivElement>}
      $width={currentItem?.width}
      $top={currentItem?.top}
      $left={currentItem?.left}
      $height={height}
      $gap={gap}
    >
      {children}
    </Item>
  )
}
