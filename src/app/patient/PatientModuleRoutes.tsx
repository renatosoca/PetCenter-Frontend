import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ModulePatientRoute } from './domain'

const PrivateGuard = lazy(() => import('@/shared/guards/private-guard/PrivateGuard'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const HomePage = lazy(() => import('./pages/home/Home'))

const PatientModuleRoutes = () => {
  return (
    <PrivateGuard>
      <RouteWithNotFound>
        <Route path={ModulePatientRoute.home} element={<HomePage />} />
        <Route path={ModulePatientRoute.home} element={<HomePage />} />
      </RouteWithNotFound>
    </PrivateGuard>
  )
}

export default PatientModuleRoutes
