import { IErrorPageInterface, IGetErrorPageInterface } from '@/domain'

export const getGlobalErrorPage = ({
  code,
  status,
  title,
  message,
  onClickCallback
}: IGetErrorPageInterface): IErrorPageInterface => {
  console.log({
    code,
    status,
    title,
    message,
    onClickCallback
  })
  switch (status) {
    case 401:
      switch (code) {
        case 'not-jwt':
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

  return {
    Icon: <></>,
    title: 'Tenemos un problema con el sistema',
    description: 'Estamos trabajando para solucionar este inconveniente. Por favor intente en otro momento.',
    presentation: 'page',
    primaryText: 'Volver a cargar',
    primaryAction: () => onClickCallback({ buttonLabel: 'Try again' })
  }
}
