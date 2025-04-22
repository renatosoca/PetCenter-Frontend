import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui'
import { cn } from '@/shared/utils'
import { memo } from 'react'

interface SidebarToggleProps {
  isOpen: boolean | undefined
  setIsOpen?: () => void
}

export const SidebarToggle = memo(({ isOpen, setIsOpen }: SidebarToggleProps) => {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
      <Button onClick={() => setIsOpen?.()} className="rounded-md w-8 h-8" variant="outline" size="icon">
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform ease-in-out duration-700',
            isOpen === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
      {/* Toggle sidebar */}
    </div>
  )
})
