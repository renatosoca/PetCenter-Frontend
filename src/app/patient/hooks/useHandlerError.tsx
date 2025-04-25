import { useEffect } from 'react'
import { getErrorHandlerPatient } from '../error-handler'
import { ErrorHandler } from '@/shared/utils'
import { TDispatchApp } from '@/store'

interface useHandleErrorProps {
  dispatchApp: TDispatchApp
  error?: Error | null
}

export const useHandlerError = ({ dispatchApp, error }: useHandleErrorProps) => {
  useEffect(() => {
    if (error)
      getErrorHandlerPatient({
        dispatchApp,
        error: error as ErrorHandler<string>
      })
  }, [error, dispatchApp])

  return
}
