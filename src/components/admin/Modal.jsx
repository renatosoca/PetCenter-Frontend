import { useState, useEffect, useContext } from 'react';
import ReactModal from 'react-modal';
import { UiContext } from '../../context';
import { initialFormModalPatient, validationsFormModalPatient } from '../../data';
import { useForm, usePatientModal } from '../../hooks';
import { stylesModalPatient } from '../../styles';
import { LoadingSpinner } from '../ui/LoadingSpinner';

ReactModal.setAppElement("#root");

export const Modal = () => {
  const { modalPatient, startCloseModal } = useContext( UiContext );

  const [ formValues, setFormValues ] = useState(initialFormModalPatient);

  const { 
    formState, name, owner, email, visitDate, symptoms, isFormValid, nameValid, ownerValid, emailValid, visitDateValid, symptomsValid, onInputChange, onResetForm
  } = useForm( formValues, validationsFormModalPatient );

  const { 
    isFormSubmit, isLoadingAction, activePatient, handleSubmit
  } = usePatientModal( formState, isFormValid, onResetForm );
  
  useEffect(() => {
    if ( activePatient !== null ) setFormValues( activePatient );
  }, [ activePatient ]);

  return (
    <ReactModal
      isOpen={modalPatient}
      onRequestClose={startCloseModal}
      closeTimeoutMS={200}
      style={stylesModalPatient}
      overlayClassName="modal-fondo"
      className={`min-w-[35rem] absolute overflow-auto px-4 py-6 border-none outline-none bg-slate-50`}
    >
      <div className='relative'>
        <h1 className="text-3xl pb-4 font-extrabold italic text-center uppercase after:content-[''] after:absolute after:w-full after:h-[.1rem] after:bg-gray-500 after:bottom-0 after:left-0">
          { activePatient?._id ? 'Editar paciente' : 'Nuevo paciente' }
        </h1>
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
          <label htmlFor="visitDate" className=" text-xs">
            Fecha de Alta
          </label>

          <input
            type="date"
            id="visitDate"
            name="visitDate"
            value={visitDate}
            onChange={onInputChange}
            className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm"
          />
          <span className="text-red-500">{isFormSubmit && visitDateValid}</span>
        </div>

        <div className="">
          <label htmlFor="symptoms" className=" text-xs">
            Síntomas
          </label>

          <textarea
            type="text"
            id="symptoms"
            placeholder="Ingrese los sintomas"
            name="symptoms"
            value={symptoms}
            onChange={onInputChange}
            className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-gray-400 placeholder:text-black placeholder:text-sm resize-none"
          />
          <span className="text-red-500">{isFormSubmit && symptomsValid}</span>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-green-400 rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center hover:text-white transition-colors"
          disabled={ isLoadingAction}
        >
          { isLoadingAction ? <LoadingSpinner /> : activePatient?._id ? 'Editar paciente' : 'Nuevo paciente' }
        </button>
      </form>
    </ReactModal>
  )
}
