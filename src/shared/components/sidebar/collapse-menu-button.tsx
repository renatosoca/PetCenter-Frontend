import { memo, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { Submenu } from '@/domain'
import { cn } from '@/shared/utils'

import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui'
import { MenuItem } from './menu-item'

interface CollapseMenuButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  submenus: Submenu[]
  isOpen?: boolean
}

//Menu and Menu item
export const CollapseMenuButton = memo(({ icon: Icon, label, submenus, isOpen }: CollapseMenuButtonProps) => {
  const { pathname } = useLocation()

  const isSubmenuActive = useMemo(
    () => submenus.some((submenu) => (submenu.active === undefined ? submenu.href === pathname : submenu.active)),
    [pathname, submenus]
  )

  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive)

  return (
    <>
      {isOpen && (
        <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
          <CollapsibleTrigger className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1" asChild>
            <Button variant={isSubmenuActive ? 'secondary' : 'ghost'} className="w-full justify-start h-10">
              <div className="w-full items-center flex justify-between">
                <div className="flex items-center">
                  <span className="mr-4">
                    <Icon size={18} />
                  </span>
                  <p
                    className={cn(
                      'max-w-[150px] truncate',
                      isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
                    )}>
                    {label}
                  </p>
                </div>
                <div
                  className={cn(
                    'whitespace-nowrap',
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
                  )}>
                  <ChevronDown size={18} className="transition-transform duration-200" />
                </div>
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            {submenus.map(({ href, label, Icon, active }, index) => (
              <MenuItem
                key={index}
                active={active!}
                pathname={pathname}
                href={href}
                isOpen={isOpen}
                Icon={Icon}
                label={label}
                isSubMenu
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Only Icons */}
      {!isOpen && (
        <DropdownMenu>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant={isSubmenuActive ? 'secondary' : 'ghost'} className="w-full justify-start h-10 mb-1">
                    <div className="w-full items-center flex justify-between">
                      <div className="flex items-center">
                        <span className={cn(isOpen === false ? '' : 'mr-4')}>
                          <Icon size={18} />
                        </span>
                        <p className={cn('max-w-[200px] truncate', isOpen === false ? 'opacity-0' : 'opacity-100')}>
                          {label}
                        </p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" align="start" alignOffset={2}>
                {label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent side="right" sideOffset={25} align="start">
            <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {submenus.map(({ href, label, active }, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  className={`cursor-pointer ${((active === undefined && pathname === href) || active) && 'bg-secondary'}`}
                  to={href}>
                  <p className="max-w-[180px] truncate">Link{label}</p>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuArrow className="fill-border" />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
})
