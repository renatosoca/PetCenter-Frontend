import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ModulePatientRoute } from './domain'

const PrivateGuard = lazy(() => import('@/shared/guards/private-guard/PrivateGuard'))
const ModuleLayout = lazy(() => import('@/shared/layout/module/ModuleLayout'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const HomePage = lazy(() => import('./pages/home/Home'))

const PatientModuleRoutes = () => {
  return (
    <PrivateGuard>
      <ModuleLayout>
        <RouteWithNotFound>
          <Route path={ModulePatientRoute.home} element={<HomePage />} />
          <Route path={ModulePatientRoute.home} element={<HomePage />} />
        </RouteWithNotFound>
      </ModuleLayout>
    </PrivateGuard>
  )
}

export default PatientModuleRoutes
