import { useContext } from "react";
import { PatientContext } from "../context";

export const useAdmin = () => {
  const { startGetPatients } = useContext( PatientContext );
  
  return {

    startGetPatients,
  }
}