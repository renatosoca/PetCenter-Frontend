import { ModulePathRoutes } from '@/domain'

export enum AuthRoutes {
  signin = '/sign-in',
  signup = '/sign-up',
  forgotPassword = '/forgot-password',
  profile = '/profile'
}

export enum AuthPages {
  signin = ModulePathRoutes.auth + AuthRoutes.signin,
  signup = ModulePathRoutes.auth + AuthRoutes.signup,
  forgotPassword = ModulePathRoutes.auth + AuthRoutes.forgotPassword,
  profile = ModulePathRoutes.auth + AuthRoutes.profile
}
