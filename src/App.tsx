import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAppStateContext } from './store'
import { ModulePathRoutes } from './domain'

const ErrorBoundary = lazy(() => import('@/shared/components/error-boundary/ErrorBoundary'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const AuthModuleRoutes = lazy(() => import('@/app/auth/AuthModuleRoutes'))
const PatientModuleRoutes = lazy(() => import('@/app/patient/PatientModuleRoutes'))

function App() {
  const { error } = useAppStateContext()

  return (
    <ErrorBoundary pathname={window.location.pathname} error={error}>
      <RouteWithNotFound>
        <Route path="/" element={<Navigate to={ModulePathRoutes.auth} />} />

        <Route path={`${ModulePathRoutes.auth}/*`} element={<AuthModuleRoutes />} />
        <Route path={`${ModulePathRoutes.patient}/*`} element={<PatientModuleRoutes />} />
      </RouteWithNotFound>
    </ErrorBoundary>
  )
}

export default App
