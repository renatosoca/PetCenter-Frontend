import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/shared/components'
import { cn } from '@/shared/utils'
import { memo } from 'react'

interface MenuItemProps {
  active?: boolean
  isSubMenu?: boolean
  href: string
  isOpen: boolean | undefined
  Icon: LucideIcon
  label: string
}

export const MenuItem = memo(({ active, href, isOpen, Icon, label, isSubMenu }: MenuItemProps) => {
  return (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      className={cn('w-full justify-start h-10 mb-1 px-4 gap-0', isSubMenu && 'pl-8')}
      asChild>
      <Link to={href}>
        <span className={cn(isOpen ? 'mr-4' : '')}>
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
