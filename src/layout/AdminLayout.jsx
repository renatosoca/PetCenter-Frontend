import { Outlet, Navigate } from "react-router-dom";
import { useForm, useAuth } from "../hooks";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context";

export const AdminLayout = () => {
  const { status } = useContext(AuthContext);

  if ( status === 'init' ) return 'Cargando...';

  return (
    <>
      <Header />

      { status === 'not-uthenticated' && <Navigate to="/auth" /> }
      { status === 'authenticated' && (
        <main className="container mx-auto mt-10">
            <Outlet />
        </main>
      )}

      <Footer />
    </>
  );
};
