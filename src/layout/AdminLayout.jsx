import { useContext } from "react";

import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { Footer, Header, NavBar } from "../components";

export const AdminLayout = () => {
  const { status, user } = useContext(AuthContext);
  
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
