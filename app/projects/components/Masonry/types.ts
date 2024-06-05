export type MasonryItemType = {
  index?: number
  id: string
  width: string
  height: number
  top: number
  left: string
  stretchColumns: number
}

export enum ActionType {
  SET_MASONRY_OPTIONS = 'SET_MASONRY_OPTIONS',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export type MasonryContextActionType =
  | {
      type: ActionType.SET_MASONRY_OPTIONS
      payload: {
        columnCount: number
        forceOrder: boolean
        gap: number
      }
    }
  | {
      type: ActionType.ADD_ITEM
      payload: MasonryItemType
    }
  | {
      type: ActionType.REMOVE_ITEM
      payload: string
    }
