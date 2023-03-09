import { Outlet, Navigate } from "react-router-dom";

import { Footer, Header, LoadingPage } from "../components";
import { useAuth } from "../hooks";

export const AdminLayout = () => {
  const { status, user } = useAuth();
  
  if ( status === 'init' ) return <LoadingPage />;

  return (
    <>
      <Header />

      { status === 'not-uthenticated' && <Navigate to="/" /> }
      { status === 'authenticated' && (
        <main className="container mx-auto pt-4">
          <Outlet />
        </main>
      )}

      <Footer />
    </>
  )
}