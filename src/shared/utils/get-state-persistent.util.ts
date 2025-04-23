import { IAppState, INITIAL_STATE_APP, TTheme } from '@/domain'
import { decodedToken } from './decoded-jwt.util'
import { IResponseLogin } from '@/app/auth/domain'
import { COOKIE_NAMES, getCookie } from './cookies.util'
import { getStorage, STORAGE_NAMES } from './storage.util'

export const getStateAppPersistent = (token?: string, defaultTheme: TTheme = 'system'): IAppState => {
  const data = token ?? getCookie(COOKIE_NAMES.auth)
  const theme = (getStorage(STORAGE_NAMES.theme) as TTheme) || defaultTheme

  if (!data) return { ...INITIAL_STATE_APP, theme }

  const decoded = decodedToken<{ user: IResponseLogin }>(data)

  if (!decoded?.user) return { ...INITIAL_STATE_APP, theme }

  const { user } = decoded
  if (!user) return { ...INITIAL_STATE_APP, theme }

  return {
    isFetching: false,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    theme,
    error: undefined
  }
}
