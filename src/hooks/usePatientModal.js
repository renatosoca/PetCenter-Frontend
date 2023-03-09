import { useContext, useState } from "react";
import { PatientContext } from "../context";

export const usePatientModal = ( formState, isFormValid, onResetForm ) => {
  const [ isFormSubmit, setFormSubmit ] = useState(false);

  const { errorMessage, status, activePatient, startAddPatient } = useContext( PatientContext );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    
    if (!isFormValid) return;
    startAddPatient( formState );
    setFormSubmit(false);
    onResetForm();
  }

  return {
    errorMessage,
    status,
    isFormSubmit,
    activePatient,

    handleSubmit,
  }
}