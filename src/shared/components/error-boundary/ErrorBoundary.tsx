import { FC, PropsWithChildren, useEffect } from 'react'
import { IErrorPageInterface } from '@/domain'
import { useFirstRender } from '@/shared/hooks'
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '..'

interface ErrorBoundaryProps extends PropsWithChildren {
  pathname: string
  error?: IErrorPageInterface
  onError?: (error: IErrorPageInterface) => void
  onClearError?: (error: IErrorPageInterface) => void
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children, pathname, error, onError, onClearError }) => {
  const { isFirstRender } = useFirstRender()

  useEffect(() => {
    if (error && onError) onError(error)
  }, [error])

  useEffect(() => {
    if (isFirstRender) return

    if (error && onClearError) onClearError(error)
  }, [pathname])

  return (
    <>
      {error?.presentation === 'page' && (
        <div className="flex items-center justify-center w-full h-[100vh] px-4">
          <div className="flex flex-col min-h-[30rem] max-w-2xl w-full rounded-md bg-white p-8 shadow-[0_2px_10px_rgba(0,34,91,0.20)]">
            <div className="flex flex-1 justify-center flex-col items-center">
              <img src="/logo.svg" alt={error.title} />

              <h2 className="text-2xl pt-5 pb-3 font-bold">{error.title}</h2>
              <p className="text-md">{error.description}</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 pt-6">
              <Button className="w-1/2" onClick={error.primaryAction}>
                {error.primaryText}
              </Button>

              {error.secondaryText && (
                <Button className="w-1/2" variant="outline" onClick={error.secondaryAction}>
                  {error.secondaryText}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {error && ['modal', 'dialog'].includes(error?.presentation) && (
        <Dialog open>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{error.title}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 py-4">
              <div className="grid flex-1 gap-2">
                <p className="text-md">{error.description}</p>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" className="min-w-10 px-8" variant="default" onClick={error.primaryAction}>
                  {error.primaryText}
                </Button>
              </DialogClose>

              {error.secondaryText && (
                <DialogClose asChild>
                  <Button type="button" className="min-w-10 px-8" variant="outline" onClick={error.secondaryAction}>
                    {error.secondaryText}
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {error?.presentation !== 'page' && children}
    </>
  )
}

export default ErrorBoundary
