export const decodedToken = <T = unknown>(token: string): T | null => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Token must be a non-empty string')
    }

    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Token is not a valid JWT')
    }

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload) as T
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}
