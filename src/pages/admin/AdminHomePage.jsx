import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Modal, PatientList } from '../../components';

import { UiContext } from '../../context';
import { useAdmin } from '../../hooks';

export const AdminHomePage = () => {

  const { startOpenModal } = useContext( UiContext );
  const { startGetPatients, startActivePatient } = useAdmin();

  /* useEffect(() => {
    startGetPatients();
  }, []); */

  const handleNewPatient = () => {
    startActivePatient({ name: '', owner: '', email: '', date: '', symptoms: '' });
    startOpenModal();
  }

  return (
    <div className="">
      <div className='flex justify-end'>
        <button
          type='button'
          className='text-white bg-slate-700 py-2 px-3 rounded-md font-medium'
          onClick={ handleNewPatient }
        >
          Agregar Paciente
        </button>
      </div>

      <div className="pt-3">
        <PatientList />
      </div>

      <Modal />
    </div>
  )
}