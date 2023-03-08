import { useEffect } from "react";
import { useAuth } from './hooks';
import { AppRoutes } from "./routes";

import { PatientsProvider } from './context/PatientsProvider';

export const App = () => {

  const { startChecking } = useAuth();

  useEffect(() => {
    startChecking();
  }, [])

  return (
    <PatientsProvider>
      <AppRoutes />
    </PatientsProvider>
  )
}
