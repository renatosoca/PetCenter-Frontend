import { useEffect, useState } from "react";
import { LoadingSpinner, SuccessMessage, WarningMessage } from "../../components";
import { initialFormUserProfile, validationsFormUserProfile } from "../../data";
import { useForm, useAuth } from "../../hooks";

export const AdminUsersPage = () => {
  const { user, isLoading, successMessage, errorMessage, startUpdateProfile } = useAuth();

  const [formValues, setFormValues] = useState(initialFormUserProfile);
  const [ isFormSubmit , setIsFormSubmit ] = useState(false);

  const { 
    formState, name, lastname, email, phone, address, isFormValid, nameValid, lastnameValid, emailValid, onInputChange 
  } = useForm( formValues,validationsFormUserProfile );
  
  useEffect(() => {
    if ( user !== null ) setFormValues(user);
  }, [user]);

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setIsFormSubmit( true );

    if (!isFormValid) return;
    startUpdateProfile(formState);
    setIsFormSubmit( false );
  };

  return (
    <>
      <h2 className="font-black text-3xl text-center py-3 uppercase italic">Actualizar mi perfil</h2>
      <p className="text-[1.3rem] font-medium pb-3 text-center text-indigo-600">Tu información: </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form
            onSubmit={handleSubmitProfile}
            className="w-full flex flex-col gap-3 text-black font-medium relative"
          >
            {!!successMessage && <SuccessMessage title={false} messageSuccess={ successMessage } />}

            <div className="">
              <label htmlFor="name" className="text-xs">
                Nombre
              </label>

              <input
                type="text"
                id="name"
                placeholder="Tu Nombre"
                name="name"
                value={name}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
              <span className="text-red-500">{isFormSubmit && nameValid}</span>
            </div>

            <div className="">
              <label htmlFor="lastname" className=" text-xs">
                Apellido
              </label>

              <input
                type="text"
                id="lastname"
                placeholder="Tu Apellido"
                name="lastname"
                value={lastname}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
              <span className="text-red-500">{isFormSubmit && lastnameValid}</span>
            </div>

            <div className="">
              <label htmlFor="email" className=" text-xs">
                Correo electrónico
              </label>

              <input
                type="email"
                id="email"
                placeholder="Tu Correo Electrónico"
                name="email"
                value={email}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
              <span className="text-red-500">{isFormSubmit && emailValid}</span>
            </div>

            <div className="">
              <label htmlFor="phone" className=" text-xs">
                Telefono
              </label>

              <input
                type="tel"
                id="phone"
                placeholder="Tu número de telefono"
                name="phone"
                value={phone}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
            </div>

            <div className="">
              <label htmlFor="address" className=" text-xs">
                Pagina Web
              </label>

              <input
                type="text"
                id="address"
                placeholder="Tu Pagina Web"
                name="address"
                value={address}
                onChange={onInputChange}
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] text-white"
              />
            </div>

            { errorMessage && <WarningMessage messageError={errorMessage} /> }

            <button
              type="submit"
              className="w-full p-3 bg-indigo-500 rounded-[.2rem] font-bold mt-4 text-white flex items-center justify-center hover:text-black transition-colors"
              disabled={isLoading === "Loading"}
            >
              { isLoading === "Loading" ? <LoadingSpinner /> : "Actualizar datos" }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
