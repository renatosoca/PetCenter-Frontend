import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { ModuleAuthPages, ModuleAuthRoutes } from './domain'

const PublicGuard = lazy(() => import('@/shared/guards/public-guard/PublicGuard'))
const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const SignInPage = lazy(() => import('./pages/sign-in/SignIn'))
const SignUpPage = lazy(() => import('./pages/sign-up/SignUp'))

const AuthModuleRoutes = () => {
  return (
    <PublicGuard>
      <RouteWithNotFound>
        <Route path="/" element={<Navigate to={ModuleAuthPages.signin} />} />

        <Route path={ModuleAuthRoutes.signin} element={<SignInPage />} />
        <Route path={ModuleAuthRoutes.signup} element={<SignUpPage />} />
      </RouteWithNotFound>
    </PublicGuard>
  )
}

export default AuthModuleRoutes
