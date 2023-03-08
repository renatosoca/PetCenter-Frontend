import { useContext, useState } from "react";
import { AuthContext } from "../context";

export const useNewPassword = () => {
  const { status, errorMessage } = useContext( AuthContext );
  
  const [ isFormSubmit, setIsFormSubmit ] = useState( false );

  const handleSubmit = e => {
    e.preventDefault();
    setIsFormSubmit( true );
  }

  return {
    status,
    errorMessage,
    isFormSubmit,

    handleSubmit,
  }
}