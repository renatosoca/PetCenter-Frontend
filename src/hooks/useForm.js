import { useEffect, useMemo, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {} ) => {

  const [ formState, setFormState ] = useState( initialForm );
  const [ formValidation, setFormValidation ] = useState( {} );

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [ initialForm ]);

  const isFormValid = useMemo( () => {
    return Object.keys( formValidation ).every( key => formValidation[key] === null );
  }, [ formValidation ] );

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys( formValidations )) {
      const [ fn, errorMessage = 'Este Campo es Requerido'] = formValidations[formField];
      formCheckedValues[ `${ formField }Valid` ] = fn( formState[formField], formState.password ) ? null : errorMessage;
      setFormValidation( formCheckedValues );
    }
  }

  return {
    //States
    ...formState,
    formState,
    ...formValidation,
    formValidation,
    isFormValid,
    
    //Methods
    onInputChange,
    onResetForm,
  };
};