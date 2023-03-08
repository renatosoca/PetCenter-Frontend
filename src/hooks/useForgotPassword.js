import { useContext, useState } from "react";
import { AuthContext } from "../context";

export const useForgotPassword = ( formState, isFormValid, onResetForm ) => {
  const { status, errorMessage, startForgotPassword, successMessage } = useContext( AuthContext );
  
  const [ isFormSubmit, setIsFormSubmit ] = useState( false );

  const handleSubmit = e => {
    e.preventDefault();
    setIsFormSubmit( true );

    if ( !isFormValid ) return;
    startForgotPassword( formState );
    setIsFormSubmit( false );
    onResetForm();
  }

  return {
    status,
    errorMessage,
    successMessage,
    isFormSubmit,

    handleSubmit,
    
  }
}