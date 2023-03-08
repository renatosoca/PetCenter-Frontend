import { Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../layout';
import { ForgotPassPage, LoginPage, RegisterPage, ResetPassPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="confirmar/:id" element={<ConfirmAccount />} /> */}
        <Route path="forgot-password" element={<ForgotPassPage />} />
        <Route path="reset-password/:token" element={<ResetPassPage />} />
      </Route>
    </Routes>
  )
}
