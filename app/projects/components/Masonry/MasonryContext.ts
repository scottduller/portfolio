import { createContext } from 'react'
import { MasonryContextActionType, MasonryItemType } from './types'

export type MasonryStateType = {
  items: MasonryItemType[]
  containerHeight: number
  columnWidth: number
  columnCount: number
  forceOrder: boolean
  gap: number
}

const initialState: MasonryStateType = {
  items: [],
  containerHeight: 0,
  columnWidth: 0,
  columnCount: 0,
  forceOrder: false,
  gap: 0,
}

export const MasonryContext = createContext<{
  state: MasonryStateType
  dispatch: React.Dispatch<MasonryContextActionType>
}>({
  state: initialState,
  dispatch: () => null,
})
