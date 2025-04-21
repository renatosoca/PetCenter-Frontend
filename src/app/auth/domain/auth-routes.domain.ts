import { ModulePathRoutes } from '@/domain'

export enum ModuleAuthRoutes {
  signin = '/sign-in',
  signup = '/sign-up',
  forgotPassword = '/forgot-password',
  profile = '/profile'
}

export enum ModuleAuthPages {
  signin = ModulePathRoutes.auth + ModuleAuthRoutes.signin,
  signup = ModulePathRoutes.auth + ModuleAuthRoutes.signup,
  forgotPassword = ModulePathRoutes.auth + ModuleAuthRoutes.forgotPassword,
  profile = ModulePathRoutes.auth + ModuleAuthRoutes.profile
}
