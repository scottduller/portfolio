import { useReducer } from 'react'
import { MasonryContext, MasonryStateType } from './MasonryContext'
import { reducer } from './reducers'

const initialState: MasonryStateType = {
  items: [],
  containerHeight: 0,
  columnWidth: 0,
  columnCount: 0,
  forceOrder: false,
  gap: 0,
}

export const MasonryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MasonryContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MasonryContext.Provider>
  )
}
