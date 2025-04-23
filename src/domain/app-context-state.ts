import { IErrorPageInterface } from '.'

export type TTheme = 'dark' | 'light' | 'system'

export interface IUser {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  age?: number
}

export interface IAppState {
  theme: TTheme
  isFetching: boolean
  user: IUser | undefined
  error?: IErrorPageInterface
}

export const INITIAL_STATE_APP: IAppState = {
  theme: 'system',
  isFetching: false,
  user: undefined,
  error: undefined
}
