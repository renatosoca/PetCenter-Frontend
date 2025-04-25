import { IErrorPageInterface, IGetErrorPageInterface } from '@/domain'
import { getGlobalErrorPage, globalErrorHandler } from '@/shared/global-error'

export const errorHandlerPatient = ({
  code,
  status,
  title,
  message,
  onClickCallback
}: IGetErrorPageInterface): IErrorPageInterface => {
  switch (status) {
    case 401:
      switch (code) {
        case 'get-patient-error':
          return {
            code,
            title: title || 'No tienes acceso a esta página',
            description: message || 'Por favor verifica que estés autenticado y tengas acceso a esta página.',
            Icon: <></>,
            primaryText: 'Aceptar',
            presentation: 'page',
            primaryAction: () => onClickCallback({ buttonLabel: 'Accept' })
          }
      }
  }

  return getGlobalErrorPage({
    code,
    status,
    title,
    message,
    onClickCallback
  })
}

export const getErrorHandlerPatient = globalErrorHandler(errorHandlerPatient)
