import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";

export const useResetPassword = ( formState, isFormValid, token, onResetForm ) => {
  const { status, errorMessage, successMessage, startValidateToken, startResetPassword } = useContext( AuthContext );
  
  const [ isFormSubmit, setIsFormSubmit ] = useState( false );

  useEffect( () => {
    startValidateToken( token);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setIsFormSubmit( true );

    if ( !isFormValid ) return;

    const { repeatPassword: password } = formState;
    startResetPassword({ token, password } );
  }

  return {
    status,
    errorMessage,
    successMessage,
    isFormSubmit,

    handleSubmit,
  }
}