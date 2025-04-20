import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { AuthPages, AuthRoutes } from './domain'

const RouteWithNotFound = lazy(() => import('@/shared/components/route-with-not-found/RouteWithNotFound'))
const SignInPage = lazy(() => import('./pages/sign-in/SignIn'))
const SignUpPage = lazy(() => import('./pages/sign-up/SignUp'))

const AuthModuleRoutes = () => {
  return (
    <RouteWithNotFound>
      <Route path="/" element={<Navigate to={AuthPages.signin} />} />

      <Route path={AuthRoutes.signin} element={<SignInPage />} />
      <Route path={AuthRoutes.signup} element={<SignUpPage />} />
    </RouteWithNotFound>
  )
}

export default AuthModuleRoutes
