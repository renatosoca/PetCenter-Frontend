import { ModulePathRoutes } from '@/domain'

export enum ModulePatientRoute {
  home = '/'
}

export enum PatientModulePages {
  home = ModulePathRoutes.patient + ModulePatientRoute.home
}
