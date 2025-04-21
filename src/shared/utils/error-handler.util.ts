import { RequestError } from '@/domain'
import { AxiosError } from 'axios'

type RequestAxios<T = string> = {
  error: unknown
  code?: T
  title?: string
  message?: string
  status?: number
}

interface AxiosErrorResponse<T = string> {
  code: T
  title?: string
  message: string
  status?: number
}

export class ErrorHandler<T> extends Error {
  public readonly code: T
  public readonly message: string
  public readonly status?: number
  public readonly title?: string

  public constructor({ code, title, message, status }: RequestError<T>) {
    super(message)
    this.code = code
    this.status = status
    this.title = title
    this.message = message

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler)
    }
  }

  static fromAxiosError<T = string>({ error, code, message, title, status }: RequestAxios<T>): ErrorHandler<T> {
    const err = error as AxiosError<AxiosErrorResponse<T>>
    const responseData = err.response?.data
    const responseStatus = err.response?.status || 500

    return new ErrorHandler<T>({
      code: (code || responseData?.code || err.code) as T,
      title: title || responseData?.title,
      message: message || responseData?.message || err.message,
      status: status || responseStatus
    })
  }
}
