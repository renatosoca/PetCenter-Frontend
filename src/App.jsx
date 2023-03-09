import { useEffect } from "react";
import { useAuth } from './hooks';
import { AppRoutes } from "./routes";

import { PatientProvider, UiProvider } from "./context";

export const App = () => {

  const { startChecking } = useAuth();

  useEffect(() => {
    startChecking();
  }, [])

  return (
    <UiProvider>
      <PatientProvider>
        <AppRoutes />
      </PatientProvider>
    </UiProvider>
  )
}
