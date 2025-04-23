import { ModulePathRoutes } from '@/domain/routes.domain'

export enum ModulePatientRoute {
  home = '/',
  profile = '/profile',
  example = '/example',
  settings = '/settings'
}

export enum PatientModulePages {
  home = ModulePathRoutes.patient + ModulePatientRoute.home,
  profile = ModulePathRoutes.patient + ModulePatientRoute.profile,
  example = ModulePathRoutes.patient + ModulePatientRoute.example,
  settings = ModulePathRoutes.patient + ModulePatientRoute.settings
}
