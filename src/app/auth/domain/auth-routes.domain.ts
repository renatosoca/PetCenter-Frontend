import { ModulePathRoutes } from '@/domain'

export enum AuthRoutes {
  Login = '/sign-in'
}

export enum AuthPages {
  Login = ModulePathRoutes.Auth + AuthRoutes.Login
}
