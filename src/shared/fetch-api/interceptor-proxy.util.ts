import { AxiosInstance } from 'axios'

export const interceptorProxy = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
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
