import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layout'

export const AdminRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<AdminLayout />} >
        <Route index element={<AdminPatients />} />
        <Route path="/admin/perfil" element={<EditProfile />} />
        <Route path="/admin/cambiar-clave" element={<ChangePassword />} />
      </Route>

    </Routes>
  )
}
