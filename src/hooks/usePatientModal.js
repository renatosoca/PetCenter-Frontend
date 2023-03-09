import { useContext, useEffect, useState } from "react";
import { PatientContext } from "../context";

export const usePatientModal = ( formState, isFormValid, onResetForm, startCloseModal ) => {

  const { errorMessage, isLoadingAction, activePatient, startSavedPatient } = useContext( PatientContext );

  const [ isFormSubmit, setFormSubmit ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (!isFormValid ) return;

    startSavedPatient( formState );
    startCloseModal();
    setFormSubmit(false);
    onResetForm();
  }

  return {
    errorMessage,
    isFormSubmit,
    activePatient,
    isLoadingAction,

    handleSubmit,
  }
}