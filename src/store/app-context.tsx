import { PropsWithChildren, createContext, memo, useContext, useMemo, useReducer } from 'react'
import { IAppState, INITIAL_STATE_APP } from '@/domain'
import { TDispatchApp, appReducer } from './app-reducer'
import { getStateAppPersistent } from '@/shared/utils'

const AppStateContext = createContext<IAppState | undefined>(undefined)
const AppDispatchContext = createContext<TDispatchApp | undefined>(undefined)

const AppProvider = memo(({ children }: PropsWithChildren) => {
  const initialState = useMemo(() => getStateAppPersistent(), [])
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE_APP, () => initialState)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
})

// eslint-disable-next-line react-refresh/only-export-components
export const useAppStateContext = () => {
  const context = useContext(AppStateContext)

  if (!context) throw new Error('useAppStateContext not init')

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppDispatchContext = () => {
  const context = useContext(AppDispatchContext)

  if (!context) throw new Error('useAppDispatchContext not init')

  return context
}

export default AppProvider
