import { useState, useEffect, useContext } from 'react';
import ReactModal from 'react-modal';

import { UiContext } from '../../context';
import { useForm, usePatientModal } from '../../hooks';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};
ReactModal.setAppElement("#root");

const initialState = {
  name: "",
  owner: "",
  email: "",
  date: "",
  symptoms: "",
};

export const Modal = () => {
  const { modalPatient, startCloseModal } = useContext( UiContext );

  const formValidations = {
    name: [ (name) => name.length > 0, "El nombre es obligatorio" ],
    owner: [ (value) => value.length > 0, "El propietario es obligatorio" ],
    email: [ (email) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).test(email), 'Tiene que ser un email válido.' ],
    date: [ (value) => value.length > 0, "La fecha es obligatoria" ],
    symptoms: [ (value) => value.length > 0, "Los síntomas son obligatorios" ]
  }
  const [ formValues, setFormValues ] = useState(initialState);

  const { 
    formState, name, owner, email, date, symptoms, isFormValid, nameValid, ownerValid, emailValid, dateValid, symptomsValid, onInputChange, onResetForm
  } = useForm( formValues, formValidations );

  const { isFormSubmit, errorMessage, status, activePatient, handleSubmit, handleOpenModal, handleCloseModal } = usePatientModal( formState, isFormValid, onResetForm );

  useEffect(() => {
    if ( activePatient !== null ) setFormValues( activePatient );
  }, [ activePatient ]);

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if ( [nombre, propietario, email, fechaAlta, sintomas].includes('') ) return setObjAlert({ msg: 'Todos los Campos son obligatorios', error:true });
        
        savePatient( { nombre, propietario, email, fechaAlta, sintomas, id } );

        setObjAlert({ msg: 'Guardado Correctamente'});

        setNombre( '' );
        setPropietario( '' );
        setEmail( '' );
        setFechaAlta( '' );
        setSintomas( '' );
        setId( '' );
  }; */

  return (
    <ReactModal
      isOpen={modalPatient}
      onRequestClose={startCloseModal}
      closeTimeoutMS={200}
      style={customStyles}
      overlayClassName="modal-fondo"
      className='min-w-[35rem] absolute overflow-auto p-4 border-none outline-none bg-slate-50'
    >
      <div>
        <h1 className="text-xl font-extrabold italic text-center uppercase ">Agregar un Paciente</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full py-5 flex flex-col gap-4 text-black relative"
      >
        <div className="flex gap-6">
          <div className="flex-1">
            <label htmlFor="name" className=" text-xs">
              Mascota
            </label>

            <input
              type="text"
              id="name"
              placeholder="Nombre de tu mascota"
              name="name"
              value={name}
              onChange={onInputChange}
              className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm"
            />
            <span className="text-red-500">{isFormSubmit && nameValid}</span>
          </div>

          <div className="flex-1">
            <label htmlFor="owner" className=" text-xs">
              Propietario
            </label>
            <input
              type="text"
              id="owner"
              placeholder="Nombre del propietario"
              name="owner"
              value={owner}
              onChange={onInputChange}
              className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm"
            />
            <span className="text-red-500">
              {isFormSubmit && ownerValid}
            </span>
          </div>
        </div>

        <div className="">
          <label htmlFor="email" className=" text-xs">
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder="Tu correo electrónico"
            name="email"
            value={email}
            onChange={onInputChange}
            className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm"
          />
          <span className="text-red-500">{isFormSubmit && emailValid}</span>
        </div>

        <div className="">
          <label htmlFor="date" className=" text-xs">
            Fecha de Alta
          </label>

          <input
            type="date"
            id="date"
            placeholder="Tu número de celular"
            name="date"
            value={date}
            onChange={onInputChange}
            className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm"
          />
          <span className="text-red-500">{isFormSubmit && dateValid}</span>
        </div>

        <div className="">
          <label htmlFor="symptoms" className=" text-xs">
            Síntomas
          </label>

          <textarea
            type="text"
            id="symptoms"
            placeholder="Tu contraseña"
            name="symptoms"
            value={symptoms}
            onChange={onInputChange}
            className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm resize-none"
          />
          <span className="text-red-500">{isFormSubmit && symptomsValid}</span>
        </div>

        {errorMessage && <WarningMessage messageError={errorMessage} />}

        <button
          type="submit"
          className="w-full p-3 bg-green-400 rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center hover:text-white transition-colors"
          disabled={status === "loading"}
        >
          {status === "loading" ? <LoadingSpinner /> : "Registrar Paciente"}
        </button>
      </form>
    </ReactModal>
  )
}
