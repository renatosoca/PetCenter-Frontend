import { Route, Routes } from 'react-router-dom';
import { AdminRoutes, AuthRoutes } from './';

export const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path='/admin/*' element={ <AdminRoutes /> } />

    </Routes>
  )
}
