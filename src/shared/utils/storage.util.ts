export const STORAGE_NAMES = {
  lastPage: 'last-page'
}

export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
