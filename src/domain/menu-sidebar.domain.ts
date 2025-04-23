import { PatientModulePages } from '@/app/patient/domain'
import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon } from 'lucide-react'

export interface Submenu {
  href: string
  label: string
  Icon: LucideIcon
  active?: boolean
}

export interface Menu {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

export interface Group {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: PatientModulePages.home,
          label: 'Pacientes',
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'Posts',
          icon: SquarePen,
          submenus: [
            {
              href: '/profile',
              label: 'All Posts',
              Icon: SquarePen
            },
            {
              href: '/posts/new',
              label: 'New Post',
              Icon: SquarePen
            }
          ]
        },
        {
          href: '/categories',
          label: 'Categories',
          icon: Bookmark
        },
        {
          href: '/tags',
          label: 'Tags',
          icon: Tag
        }
      ]
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: PatientModulePages.profile,
          label: 'profile',
          icon: Users
        },
        {
          href: PatientModulePages.example,
          label: 'example',
          icon: Settings
        }
      ]
    }
  ]
}
