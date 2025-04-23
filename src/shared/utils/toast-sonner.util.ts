import { toast } from 'sonner'

interface showToastProps {
  title?: string
  message?: string
  closeButton?: boolean
  richColors?: boolean

  actionLabel?: string
  cancelLabel?: string
  action?: () => void
  cancel?: () => void
}

export const showToast = {
  success: ({
    title,
    message,
    closeButton,
    richColors = true,
    actionLabel = '',
    cancelLabel = 'Cerrar',
    action = () => {},
    cancel = () => {}
  }: showToastProps) => {
    toast.success(title, {
      description: message,
      closeButton,
      action: actionLabel && action ? { label: actionLabel, onClick: action } : undefined,
      cancel: cancelLabel && cancel ? { label: cancelLabel, onClick: cancel } : undefined,
      richColors
    })
  },
  error: ({
    title,
    message,
    closeButton,
    richColors = true,
    actionLabel = '',
    cancelLabel = 'Cerrar',
    action = () => {},
    cancel = () => {}
  }: showToastProps) => {
    toast.error(title, {
      description: message,
      closeButton,
      action: actionLabel && action ? { label: actionLabel, onClick: action } : undefined,
      cancel: cancelLabel && cancel ? { label: cancelLabel, onClick: cancel } : undefined,
      richColors
    })
  },
  warning: ({
    title,
    message,
    closeButton,
    richColors = true,
    actionLabel = '',
    cancelLabel = 'Cerrar',
    action = () => {},
    cancel = () => {}
  }: showToastProps) =>
    toast.warning(title, {
      description: message,
      closeButton,
      action: actionLabel && action ? { label: actionLabel, onClick: action } : undefined,
      cancel: cancelLabel && cancel ? { label: cancelLabel, onClick: cancel } : undefined,
      richColors
    }),
  info: ({
    title,
    message,
    closeButton,
    richColors = true,
    actionLabel = '',
    cancelLabel = 'Cerrar',
    action = () => {},
    cancel = () => {}
  }: showToastProps) =>
    toast.info(title, {
      description: message,
      closeButton,
      action: actionLabel && action ? { label: actionLabel, onClick: action } : undefined,
      cancel: cancelLabel && cancel ? { label: cancelLabel, onClick: cancel } : undefined,
      richColors
    })
}
