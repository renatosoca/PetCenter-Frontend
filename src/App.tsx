import { lazy, useEffect } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { ModulePathRoutes } from './domain'
import { useAppStateContext } from './store'
import { Toaster } from './shared/components/ui/sonner'

const ErrorBoundary = lazy(() => import('@/shared/components/error-boundary/ErrorBoundary'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const AuthModuleRoutes = lazy(() => import('@/app/auth/AuthModuleRoutes'))
const PatientModuleRoutes = lazy(() => import('@/app/patient/PatientModuleRoutes'))

function App() {
  const { error, theme } = useAppStateContext()

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <ErrorBoundary pathname={window.location.pathname} error={error}>
      <RouteWithNotFound>
        <Route path="/" element={<Navigate to={ModulePathRoutes.auth} />} />

        <Route path={`${ModulePathRoutes.auth}/*`} element={<AuthModuleRoutes />} />
        <Route path={`${ModulePathRoutes.patient}/*`} element={<PatientModuleRoutes />} />
      </RouteWithNotFound>

      <Toaster />
    </ErrorBoundary>
  )
}

export default App
