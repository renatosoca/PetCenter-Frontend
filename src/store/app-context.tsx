import { PropsWithChildren, createContext, useContext, useReducer } from 'react'
import { IAppState, INITIAL_STATE_APP } from '@/domain'
import { TDispatchApp, appReducer } from './app-reducer'

export const AppStateContext = createContext<IAppState | undefined>(undefined)
export const AppDispatchContext = createContext<TDispatchApp | undefined>(undefined)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE_APP)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export const useAppStateContext = () => {
  const context = useContext(AppStateContext)

  if (!context) throw new Error('useAppStateContext not init')

  return context
}

export const useAppDispatchContext = () => {
  const context = useContext(AppDispatchContext)

  if (!context) throw new Error('useAppDispatchContext not init')

  return context
}
