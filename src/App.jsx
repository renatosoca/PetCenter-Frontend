import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import NewPassword from "./pages/NewPassword";
//Rutas Protegidas
import AdminLayout from "./layout/AdminLayout";
import AdminPatients from "./pages/AdminPatients";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registro" element={<Register/>} />
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
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
