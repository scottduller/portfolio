import { useContext } from 'react'
import { MasonryContext } from './MasonryContext'
import { ActionType, MasonryItemType } from './types'

const useMasonry = () => {
  const { state, dispatch } = useContext(MasonryContext)

  const setMasonryOptions = (
    columnCount: number,
    forceOrder: boolean,
    gap: number,
  ) => {
    dispatch({
      type: ActionType.SET_MASONRY_OPTIONS,
      payload: {
        columnCount,
        forceOrder,
        gap,
      },
    })
  }

  const addItem = (item: MasonryItemType) => {
    dispatch({
      type: ActionType.ADD_ITEM,
      payload: item,
    })
  }

  const removeItem = (id: string) => {
    dispatch({
      type: ActionType.REMOVE_ITEM,
      payload: id,
    })
  }

  return {
    ...state,
    setMasonryOptions,
    addItem,
    removeItem,
  }
}

export { useMasonry }
