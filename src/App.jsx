import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PatientsProvider } from './context/PatientsProvider';
import AuthLayout from "./layout/AuthLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import NewPassword from "./pages/NewPassword";
//Rutas Protegidas
import AdminLayout from "./layout/AdminLayout";
import AdminPatients from "./pages/AdminPatients";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import { useEffect } from "react";

import { useForm, useAuth } from './hooks';
import { LoginPage, RegisterPage } from "./pages";

function App() {

  const { status, startChecking } = useAuth();

  useEffect(() => {
    startChecking();
  }, [])

  return (
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="registro" element={<RegisterPage />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
              <Route path="olvide-password" element={<ForgotPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<AdminPatients />} />
              <Route path="/admin/perfil" element={<EditProfile />} />
              <Route path="/admin/cambiar-clave" element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientsProvider>
  );
};

export default App;
