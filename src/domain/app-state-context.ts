import { IErrorPageInterface } from '.'

export interface IUser {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  age?: number
}

export interface IAppState {
  isFetching: boolean
  user: IUser | undefined
  error?: IErrorPageInterface
}

export const INITIAL_STATE_APP: IAppState = {
  isFetching: false,
  user: undefined,
  error: undefined
}
