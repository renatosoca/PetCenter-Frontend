import { useContext, useState } from "react";
import { AuthContext } from "../context";

export const useRegister = ( formState, isFormValid ) => {

  const { startRegister, status, errorMessage, successMessage } = useContext(AuthContext);
  const [ isFormSubmit, setIsFormSubmit ] = useState(false);

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);

    if ( !isFormValid ) return;

    startRegister( formState );
    setIsFormSubmit(false);
  };

  return {
    status,
    errorMessage,
    successMessage,
    isFormSubmit,

    handleSubmitRegister,
  }
}