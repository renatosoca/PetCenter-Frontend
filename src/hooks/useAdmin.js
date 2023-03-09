import { useContext } from "react";
import { PatientContext } from "../context";

export const useAdmin = () => {
  const { startGetPatients, patients } = useContext( PatientContext );
  
  return {
    patients,

    startGetPatients,
  }
}