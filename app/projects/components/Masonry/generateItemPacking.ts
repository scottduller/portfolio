import { pxPercCalcAdd, pxPercCalcSub } from './generateCalcString'
import { MasonryItemType } from './types'

type PackItemsProps = {
  items: MasonryItemType[]
  columnWidth: number
  columnCount: number
  forceOrder: boolean
  gap: number
}

const packItems = ({
  items,
  columnWidth,
  columnCount,
  forceOrder,
  gap,
}: PackItemsProps) => {
  const columnHeights = Array.from({ length: columnCount }, () => 0)

  let sortedItems = [...items]

  if (forceOrder) {
    sortedItems = sortedItems.sort((a, b) => {
      if (a.index === undefined || b.index === undefined) {
        return 0
      }
      return a.index - b.index
    })
  } else {
    sortedItems = sortedItems.map((item, index) => ({
      ...item,
      index: item.index === undefined ? index : item.index,
    }))
    sortedItems = sortedItems.sort((a, b) => {
      if (a.stretchColumns === b.stretchColumns) b.height - a.height
      return b.stretchColumns - a.stretchColumns
    })
  }

  sortedItems.forEach((item) => {
    const stretchColumns = item.stretchColumns

    let minTop = Infinity
    let startColumn = -1

    for (let i = 0; i <= columnCount - stretchColumns; i++) {
      const maxTopInSet = Math.max(
        ...columnHeights.slice(i, i + stretchColumns),
      )
      if (maxTopInSet < minTop) {
        minTop = maxTopInSet
        startColumn = i
      }
    }

    const left = startColumn * columnWidth

    let top = minTop

    top = top === 0 ? 0 : top + gap

    for (let i = startColumn; i < startColumn + stretchColumns; i++) {
      columnHeights[i] = top + item.height
    }

    item.left =
      left === 0 ? '0' : pxPercCalcAdd(left, (gap * startColumn) / columnCount)
    item.top = top
    item.width = pxPercCalcSub(
      stretchColumns * columnWidth,
      ((columnCount - stretchColumns) * gap) / columnCount,
    )
  })

  return {
    items: sortedItems.sort((a, b) => a.index! - b.index!),
    containerHeight: Math.max(...columnHeights),
  }
}

export default packItems
