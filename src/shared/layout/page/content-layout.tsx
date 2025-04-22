import { Toolbar } from '@/shared/components'
import { memo } from 'react'

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export const ContentLayout = memo(({ title, children }: ContentLayoutProps) => {
  return (
    <div>
      <Toolbar title={title} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  )
})
