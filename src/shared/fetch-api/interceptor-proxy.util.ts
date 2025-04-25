import { AxiosInstance } from 'axios'
import { COOKIE_NAMES, getCookie } from '../utils'

export const interceptorProxy = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getCookie(COOKIE_NAMES.auth)

      if (token) config.headers.Authorization = `Bearer ${token}`

      return config
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )
}
