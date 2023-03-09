import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Modal } from '../../components';

import PatientList from "../../components/PatientList";
import { UiContext } from '../../context';
import { useAdmin } from '../../hooks';

export const AdminHomePage = () => {
  const { startOpenModal } = useContext( UiContext );

  const { startGetPatients } = useAdmin();
  const [ showForm, setShowForm ] = useState(false);

  useEffect(() => {
    startGetPatients();
  }, [])

  return (
    <div className="">
      <button
        type='button'
        className='bg-indigo-600 text-white font-bold p-3 rounded-md uppercase'
        onClick={ startOpenModal }
      >
        { showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>

      <div className="">
        <PatientList />
      </div>

      <Modal />
    </div>
  )
}