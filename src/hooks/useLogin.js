import { useContext, useState } from "react";
import { AuthContext } from "../context";

export const useLogin = ( formState, isFormValid, onResetForm ) => {
  const { startLogin, status, errorMessage } = useContext(AuthContext);
  const [ isFormSubmit, setIsFormSubmit ] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setIsFormSubmit(true);

    if ( !isFormValid ) return;

    startLogin( formState );
    setIsFormSubmit(false);
    onResetForm();
  };

  return {
    status,
    errorMessage,
    isFormSubmit,

    handleSubmitLogin,
  }
}