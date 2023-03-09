import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layout'
import { AdminHomePage, AdminNewPassPage, AdminUsersPage } from '../pages'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} >
        <Route index element={<AdminHomePage />} />
        <Route path="profile" element={<AdminUsersPage />} />
        <Route path="reset-password" element={<AdminNewPassPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" />} />

    </Routes>
  )
}
