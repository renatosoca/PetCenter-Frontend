import { Dispatch } from 'react'
import { produce, Draft } from 'immer'
import { IAppState, IErrorPageInterface, IUser, TTheme } from '@/domain'

export type TDispatchApp = Dispatch<AppActionType>

type AppActionType =
  | { type: 'IsFetching' }
  | { type: 'FinishFetching' }
  | { type: 'ChangeTheme'; payload: TTheme }
  | { type: 'UserAuthenticated'; payload: IUser }
  | { type: 'ErrorFetching'; payload: IErrorPageInterface }
  | { type: 'ClearError' }

export const appReducer = produce((draft: Draft<IAppState>, action: AppActionType): IAppState => {
  switch (action.type) {
    case 'IsFetching':
      return {
        ...draft,
        isFetching: true
      }
    case 'FinishFetching':
      return {
        ...draft,
        isFetching: false
      }
    case 'ChangeTheme':
      return {
        ...draft,
        theme: action.payload
      }
    case 'UserAuthenticated':
      return {
        ...draft,
        user: action.payload
      }
    case 'ErrorFetching':
      return {
        ...draft,
        isFetching: false,
        error: action.payload
      }
    case 'ClearError':
      return {
        ...draft,
        error: undefined
      }

    default:
      throw new Error(`Not find type: ${action}`)
  }
})
