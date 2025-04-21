import { IAppState, INITIAL_STATE_APP } from '@/domain'
import { decodedToken } from './decoded-jwt.util'
import { IResponseLogin } from '@/app/auth/domain'
import { COOKIE_NAMES, getCookie } from './cookies.util'

export const getPersistentUser = (token?: string): IAppState => {
  const data = token ?? getCookie(COOKIE_NAMES.auth)

  if (!data) return INITIAL_STATE_APP

  const decoded = decodedToken<{ user: IResponseLogin }>(data)

  if (!decoded?.user) return INITIAL_STATE_APP

  const { user } = decoded
  if (!user) return INITIAL_STATE_APP

  return {
    isFetching: false,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    error: undefined
  }
}
