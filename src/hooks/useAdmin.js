import { useContext } from "react";
import { PatientContext } from "../context";

export const useAdmin = () => {
  return useContext( PatientContext );
}