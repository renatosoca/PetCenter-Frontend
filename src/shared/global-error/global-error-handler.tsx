import { IErrorPageInterface, IGetErrorPageInterface, RequestError } from '@/domain'
import { TDispatchApp } from '@/store'
import { getGlobalErrorPage } from './global-error-page'

interface IGlobalErrorHandlerPropsReturn<T = unknown> {
  dispatchApp: TDispatchApp
  error: RequestError<string>
  additionalInformation?: T
}

type TErrorPageDetail = (errorPage: IGetErrorPageInterface) => IErrorPageInterface
type TGlobalErrorhandler = (errorHandler: IGlobalErrorHandlerPropsReturn) => void

export const globalErrorHandler = (errorPage: TErrorPageDetail): TGlobalErrorhandler => {
  return ({ dispatchApp, error, additionalInformation }: IGlobalErrorHandlerPropsReturn): void => {
    if (!error) return

    const { code, message, status, title } = error

    const errorPageDetail = errorPage({
      code,
      message,
      status,
      title,
      additionalInformation,
      onClickCallback: ({ buttonLabel }) => {
        switch (status) {
          case 401:
            console.log('401 error')
            dispatchApp({ type: 'ClearError' })
            console.log('401 error')
            break
          case 403:
            console.log('403 error')
            break

          case 404:
            console.log('404 error')
            break

          case 500:
            console.log('500 error')
            break

          default:
            if (buttonLabel === 'Try again') {
              dispatchApp({ type: 'ClearError' })
            }
            console.log('Unknown error default')
            break
        }
      }
    })

    if (status === 401) console.log('Sesión expirada')

    dispatchApp({ type: 'ErrorFetching', payload: errorPageDetail })
  }
}

export const getGlobalErrorHandler = globalErrorHandler(getGlobalErrorPage)
