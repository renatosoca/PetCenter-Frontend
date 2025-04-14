import { Dispatch } from 'react'
import { produce, Draft } from 'immer'
import { IAppState, IErrorPageInterface } from '@/domain'

export type TDispatchApp = Dispatch<AppActionType>

type AppActionType =
  | { type: 'IsFetching' }
  | { type: 'ErrorFetching'; payload: IErrorPageInterface }
  | { type: 'ClearError' }

export const appReducer = produce((draft: Draft<IAppState>, action: AppActionType): IAppState => {
  switch (action.type) {
    case 'IsFetching':
      return {
        ...draft
      }
    case 'ErrorFetching':
      return {
        ...draft,
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
