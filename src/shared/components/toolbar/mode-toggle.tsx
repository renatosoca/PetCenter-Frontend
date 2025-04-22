import { MoonIcon, SunIcon } from 'lucide-react'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

export const ModeToggle = () => {
  //const { setTheme, theme } = useTheme();
  const theme = 'dark'

  const setTheme = (theme: string) => {
    console.log({ theme })
  }
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-background mr-2"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
