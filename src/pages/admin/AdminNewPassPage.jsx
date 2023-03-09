import { useState } from "react";
import { useForm, useAuth } from "../../hooks";

const initalForm = {
  oldPassword: "",
  newPassword: "",
};

export const AdminNewPassPage = () => {
  const formValidations = {
    oldPassword: [ (oldPassword) => oldPassword.length > 0, "La contraseña actual es requerida", ],
    newPassword: [ (newPassword) => newPassword.length > 7, "La nueva contraseña tiene que tener un mínimo de 8 caracteres" ],
  };

  const { startUpdatePassProfile } = useAuth();

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
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Contraseña
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-500 font-bold">Contraseña Aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="oldPassword"
                className="uppercase font-bold text-gray-500"
              >
                Contraseña Actual
              </label>
              <input
                type="password"
                className="outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                placeholder="Tu Contraseña Actual"
                id="oldPassword"
                name="oldPassword"
                value={ oldPassword }
                onChange={ onInputChange }
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="newPassword"
                className="uppercase font-bold text-gray-500"
              >
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                placeholder="Tu Nueva Contraseña"
                id="newPassword"
                name="newPassword"
                value={ newPassword }
                onChange={ onInputChange }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Contraseña"
              className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};
