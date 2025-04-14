import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { AuthPages, AuthRoutes } from './domain'

const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const SignInPage = lazy(() => import('./pages/sign-in/SignIn'))

const AuthModuleRoutes = () => {
  return (
    <RouteWithNotFound>
      <Route path="/" element={<Navigate to={AuthPages.Login} />} />

      <Route path={AuthRoutes.Login} element={<SignInPage />} />
    </RouteWithNotFound>
  )
}

export default AuthModuleRoutes
