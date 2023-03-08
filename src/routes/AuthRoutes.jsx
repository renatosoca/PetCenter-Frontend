import { Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../layout';
import { ConfirmAccPage, ForgotPassPage, LoginPage, RegisterPage, ResetPassPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassPage />} />
        <Route path="reset-password/:token" element={<ResetPassPage />} />
      </Route>

      <Route path="confirm/:id" element={<ConfirmAccPage />} />

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
