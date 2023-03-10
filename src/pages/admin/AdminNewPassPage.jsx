import { useState } from "react";

import { LoadingSpinner, SuccessMessage, WarningMessage } from "../../components";
import { useForm, useAuth } from "../../hooks";

const initalForm = {
  oldPassword: "",
  newPassword: "",
};

export const AdminNewPassPage = () => {
    const { successMessage, errorMessage, isLoading, startUpdatePassProfile } = useAuth();

  const formValidations = {
    oldPassword: [ (oldPassword) => oldPassword.length > 0, "La contraseña actual es requerida", ],
    newPassword: [ (newPassword) => newPassword.length > 7, "La nueva contraseña tiene que tener un mínimo de 8 caracteres" ],
  };

  const [ isFormSubmit , setIsFormSubmit ] = useState(false);

  const {
    formState, oldPassword, newPassword, isFormValid, oldPasswordValid, newPasswordValid, onInputChange, onResetForm,
  } = useForm(initalForm, formValidations);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmit(true);

    if ( !isFormValid ) return;
    startUpdatePassProfile(formState);

    setIsFormSubmit(false);
    onResetForm();
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center py-3 italic uppercase">
        Cambiar Contraseña
      </h2>
      <p className="text-base pb-6 text-center font-medium text-indigo-500">Ingrese su nueva contraseña</p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 text-black font-medium relative"
          >
            {!!successMessage && <SuccessMessage title={false} messageSuccess={ successMessage } />}

            <div className="">
              <label htmlFor="oldPassword" className="text-xs">
                Contraseña Actual
              </label>

              <input
                type="password"
                id="name"
                placeholder="Tu Contraseña Actual"
                name="oldPassword"
                value={oldPassword}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
              <span className="text-red-500">{isFormSubmit && oldPasswordValid}</span>
            </div>

            <div className="">
              <label htmlFor="newPassword" className=" text-xs">
                Nueva Contraseña
              </label>

              <input
                type="password"
                id="newPassword"
                placeholder="Tu Nueva Contraseña"
                name="newPassword"
                value={newPassword}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
              <span className="text-red-500">{isFormSubmit && newPasswordValid}</span>
            </div>

            { errorMessage && <WarningMessage messageError={errorMessage} /> }

            <button
              type="submit"
              className="w-full p-3 bg-indigo-500 rounded-[.2rem] font-bold mt-4 text-white flex items-center justify-center hover:text-black transition-colors"
              disabled={isLoading === "Loading"}
            >
              { isLoading === "Loading" ? <LoadingSpinner /> : "Actualizar contraseña" }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
