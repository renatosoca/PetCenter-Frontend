export type TypeWithKey<T> = { [key: string]: T }

export interface RequestError<T> {
  code: T
  message: string
  status?: number
  title?: string
}

export interface IErrorPageInterface {
  Icon: React.ReactNode
  title: string
  description: string
  code?: string
  presentation: PresentationTypes
  primaryText: string
  primaryAction: () => void
  secondaryText?: string
  secondaryAction?: () => void
}

type PresentationTypes = 'none' | 'page' | 'modal' | 'dialog'

export interface IGetErrorPageInterface<T = unknown> extends RequestError<string> {
  onClickCallback: ({ buttonLabel }: { buttonLabel: string }) => void
  additionalInformation?: T
}
