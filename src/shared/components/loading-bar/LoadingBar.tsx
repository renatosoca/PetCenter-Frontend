import { FC } from 'react'

export const LoadingBar: FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-[.35rem] bg-transparent z-50 overflow-hidden">
      <div className="h-full w-[40%] bg-blue-500 animate-slide-fade rounded-primary" />
    </div>
  )
}
