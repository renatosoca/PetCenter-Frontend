import { memo, PropsWithChildren } from 'react'
import { Sidebar } from '@/shared/components'
import { useStore } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import { sidebarStore } from '@/store'

const ModuleLayout = memo(({ children }: PropsWithChildren) => {
  const sidebar = useStore(sidebarStore, (x) => x)
  if (!sidebar) return null
  const { getOpenState, settings } = sidebar

  return (
    <>
      <Sidebar />

      <main
        className={cn(
          'min-h-[calc(100vh_-_24px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}>
        {children}
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}>
        {/* <Footer /> */}
        Footer
      </footer>
    </>
  )
})

export default ModuleLayout
