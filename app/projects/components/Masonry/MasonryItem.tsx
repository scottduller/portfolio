import { useRef, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { pxPercCalcSub } from './generateCalcString'
import { useMasonry } from './useMasonry'
import { MasonryItemType } from './types'
import { useMeasure } from '@react-hookz/web'

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

  useEffect(() => {
    if (!itemSize) return

    const width = pxPercCalcSub(
      stretchColumns * columnWidth,
      ((columnCount - stretchColumns) * gap) / columnCount,
    )
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
      console.log('masonryItem useEffect')
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
      console.log('masonryItem useEffect')
    }

    setCurrentItem(newItem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, itemSize, stretchColumns, columnWidth, columnCount, gap])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      removeItem(id.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="masonryItem"
      style={{
        height: height,
        width: currentItem?.width,
        top: currentItem?.top,
        left: currentItem?.left,
      }}
    >
      {currentItem?.width && children}
    </div>
  )
}
