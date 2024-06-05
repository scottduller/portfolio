import packItems from './generateItemPacking'
import { MasonryStateType } from './MasonryContext'
import { ActionType, MasonryContextActionType } from './types'

export const reducer = (
  state: MasonryStateType,
  action: MasonryContextActionType,
) => {
  const { items, forceOrder, columnCount, columnWidth, gap } = state

  switch (action.type) {
    case ActionType.SET_MASONRY_OPTIONS: {
      const { columnCount, forceOrder, gap } = action.payload
      const columnWidth = columnCount ? 100 / columnCount : 0

      const packedItems = packItems({
        items,
        columnWidth,
        columnCount,
        forceOrder,
        gap,
      })

      const { items: newItems, containerHeight } = packedItems

      return {
        ...state,
        containerHeight,
        columnWidth,
        columnCount,
        forceOrder,
        gap,
        items: newItems,
      }
    }
    case ActionType.ADD_ITEM: {
      const currentItem = state.items.find((i) => i.id === action.payload.id)

      const packedItems = packItems({
        items: currentItem
          ? state.items.map((i) =>
              i.id === action.payload.id ? action.payload : i,
            )
          : [...state.items, action.payload],
        columnWidth,
        columnCount,
        forceOrder,
        gap,
      })

      const { items: newItems, containerHeight } = packedItems

      return {
        ...state,
        containerHeight,
        items: newItems,
      }
    }

    case ActionType.REMOVE_ITEM: {
      const packedItems = packItems({
        items: state.items.filter((i) => i.id !== action.payload),
        columnWidth,
        columnCount,
        forceOrder,
        gap,
      })

      const { items: newItems, containerHeight } = packedItems

      return {
        ...state,
        containerHeight,
        items: newItems,
      }
    }

    default:
      return state
  }
}
