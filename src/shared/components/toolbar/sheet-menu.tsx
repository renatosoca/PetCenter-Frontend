import { Link } from 'react-router-dom'
import { MenuIcon, PanelsTopLeft } from 'lucide-react'
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui'
import { Menu } from '../sidebar'

export const SheetMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left" aria-describedby="sheet-description">
        <SheetHeader>
          <Button className="flex justify-center items-center pb-2 pt-1" variant="link" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <PanelsTopLeft className="w-6 h-6 mr-1" />
              <SheetTitle className="font-bold text-lg">Brand title resp</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        {/* Sidebar Responsive */}
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
