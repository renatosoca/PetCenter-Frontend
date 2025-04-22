import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/shared/components'
import { cn } from '@/shared/utils'
import { memo } from 'react'

interface MenuItemProps {
  active: boolean
  pathname: string
  href: string
  isOpen: boolean | undefined
  Icon: LucideIcon
  label: string
  isSubMenu?: boolean
}

export const MenuItem = memo(({ active, pathname, href, isOpen, Icon, label, isSubMenu }: MenuItemProps) => {
  return (
    <Button
      variant={(active === undefined && pathname.startsWith(href)) || active ? 'secondary' : 'ghost'}
      className={cn('w-full justify-start h-10 mb-1', isSubMenu && 'pl-10')}
      asChild>
      <Link to={href}>
        <span className={cn(isOpen === false ? '' : 'mr-4', isSubMenu && 'mr-4 ml-2')}>
          <Icon size={18} />
        </span>
        <p
          className={cn(
            'max-w-[200px] truncate',
            isSubMenu && 'max-w-[170px]',
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
          )}>
          {label}
        </p>
      </Link>
    </Button>
  )
})
