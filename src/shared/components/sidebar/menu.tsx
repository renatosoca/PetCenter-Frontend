import { useLocation } from 'react-router-dom'
import { Ellipsis, LogOut } from 'lucide-react'
import { getMenuList } from '@/domain'
import { cn } from '@/shared/utils'
import { Button, ScrollArea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'
import { CollapseMenuButton } from './collapse-menu-button'
import { MenuItem } from './menu-item'
import { memo, useMemo } from 'react'

interface MenuProps {
  isOpen: boolean | undefined
}

export const Menu = memo(({ isOpen }: MenuProps) => {
  const { pathname } = useLocation()

  const menuList = useMemo(() => getMenuList(), [])

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full size-full grow">
        <ul className="flex h-full flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            /* Group labels */
            <li key={index} className={cn('w-full', groupLabel && 'pt-5')}>
              {isOpen && groupLabel && (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              )}

              {!isOpen && groupLabel && (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {!groupLabel && <p className="pb-2"></p>}

              {/* Menu Items */}
              {menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
                submenus && submenus.length > 0 ? (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active ?? pathname.startsWith(href)}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger className="w-full">
                          <MenuItem
                            key={index}
                            active={active ?? pathname.startsWith(href)}
                            href={href}
                            isOpen={isOpen}
                            Icon={Icon}
                            label={label}
                          />
                        </TooltipTrigger>
                        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )
              )}
            </li>
          ))}

          {/* Logout */}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button onClick={() => {}} variant="outline" className="w-full justify-center h-10 mt-5 px-4">
                    <span className={cn(isOpen === false ? '' : 'mr-4')}>
                      <LogOut size={18} />
                    </span>
                    <p className={cn('whitespace-nowrap', isOpen === false ? 'opacity-0 hidden' : 'opacity-100')}>
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
})
