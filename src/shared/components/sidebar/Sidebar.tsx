import { Link } from 'react-router-dom'
import { PanelsTopLeft } from 'lucide-react'
import { Button } from '@/shared/components'
import { useStore } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import { sidebarStore } from '@/store'
import { SidebarToggle } from './sidebar-toggle'
import { Menu } from './menu'

export function Sidebar() {
  const sidebar = useStore(sidebarStore, (x) => x)
  if (!sidebar) return null
  const { isOpen, toggleSidebar, getOpenState, setIsHover, settings } = sidebar
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !getOpenState() ? 'w-[90px]' : 'w-72',
        settings.disabled && 'hidden'
      )}>
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleSidebar} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            !getOpenState() ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                !getOpenState() ? '-translate-x-96 opacity-0 hidden' : 'translate-x-0 opacity-100'
              )}>
              Pet center
            </h1>
          </Link>
        </Button>

        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  )
}
