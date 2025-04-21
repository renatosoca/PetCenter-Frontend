import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { produce } from 'immer'

type SidebarSettings = { disabled: boolean; isHoverOpen: boolean }
interface ISidebarStore {
  isOpen: boolean
  isHover: boolean
  settings: SidebarSettings

  toggleSidebar: () => void
  setIsOpen: (isOpen: boolean) => void
  setIsHover: (isHover: boolean) => void
  getOpenState: () => boolean
  setSettings: (settings: Partial<SidebarSettings>) => void
}

export const sidebarStore = create(
  persist<ISidebarStore>(
    (set, get) => ({
      isOpen: true,
      isHover: false,
      settings: { disabled: false, isHoverOpen: false },
      toggleSidebar: () => {
        set({ isOpen: !get().isOpen })
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen })
      },
      setIsHover: (isHover: boolean) => {
        set({ isHover })
      },
      getOpenState: () => {
        const state = get()
        return state.isOpen || (state.settings.isHoverOpen && state.isHover)
      },
      setSettings: (settings: Partial<SidebarSettings>) => {
        set(
          produce((state: ISidebarStore) => {
            state.settings = { ...state.settings, ...settings }
          })
        )
      }
    }),
    {
      name: 'sidebar_state',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
