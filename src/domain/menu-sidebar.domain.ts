import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  Icon: LucideIcon
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname?: string): Group[] {
  console.log({ pathname })
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
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
              href: '/posts',
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
          href: '/users',
          label: 'Users',
          icon: Users
        },
        {
          href: '/account',
          label: 'Account',
          icon: Settings
        }
      ]
    }
  ]
}
