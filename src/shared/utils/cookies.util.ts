import Cookies from 'js-cookie'

export const COOKIE_NAMES = {
  auth: 'auth-token'
}

export const setCookie = (cookieName: string, cookieValue: string) => {
  const hours = 1 * 60 * 60 * 1000 // 1 hour in milliseconds
  const date = new Date()
  date.setTime(date.getTime() + hours)

  Cookies.set(cookieName, cookieValue, {
    expires: date,
    secure: true,
    sameSite: 'Strict',
    httpOnly: true
  })
}

export const getCookie = (cookieName: string) => {
  return Cookies.get(cookieName)
}

export const clearCookie = (cookieName: string) => {
  Cookies.remove(cookieName)
}

export const clearAllCookies = () => {
  for (const cookieName of Object.values(COOKIE_NAMES)) {
    clearCookie(cookieName)
  }
}
