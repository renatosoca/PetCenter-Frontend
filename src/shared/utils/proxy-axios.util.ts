import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { apiBaseUrl } from '@/app.globals'

export class ApiProxy {
  private api: AxiosInstance

  constructor(baseURL: string = `${apiBaseUrl}/api`) {
    this.api = axios.create({
      baseURL
    })
  }

  setInstance(instance: AxiosInstance) {
    this.api = instance
  }

  async get<T>(uri: string, config?: AxiosRequestConfig) {
    const response = await this.api.get<T>(uri, { ...(config && { ...config }) })
    return response
  }

  async post<T>(uri: string, data: any, config?: AxiosRequestConfig) {
    const response = await this.api.post<T>(uri, data, { ...(config && { ...config }) })
    return response
  }

  async put<T>(uri: string, data: any, config?: AxiosRequestConfig) {
    const response = await this.api.put<T>(uri, data, { ...(config && { ...config }) })
    return response
  }

  async delete<T>(uri: string, config?: AxiosRequestConfig) {
    const response = await this.api.delete<T>(uri, { ...(config && { ...config }) })
    return response
  }
}
