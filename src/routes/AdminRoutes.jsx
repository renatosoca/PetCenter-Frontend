import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layout'
import { AdminHomePage, AdminNewPassPage, AdminUsersPage } from '../pages'

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} >
        <Route index element={<AdminHomePage />} />
        <Route path="/admin/profile" element={<AdminUsersPage />} />
        <Route path="/admin/reset-password" element={<AdminNewPassPage />} />
      </Route>

    </Routes>
  )
}
