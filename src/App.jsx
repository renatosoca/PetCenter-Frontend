import { useEffect } from "react";
import { useAuth } from './hooks';
import { AppRoutes } from "./routes";

import { PatientProvider } from "./context";

export const App = () => {

  const { startChecking } = useAuth();

  useEffect(() => {
    startChecking();
  }, [])

  return (
    <PatientProvider>
      <AppRoutes />
    </PatientProvider>
  )
}
