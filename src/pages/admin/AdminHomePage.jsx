import { useContext } from 'react';
import { Modal, PatientList } from '../../components';
import { UiContext } from '../../context';
import { useAdmin } from '../../hooks';

export const AdminHomePage = () => {

  const { startOpenModal } = useContext( UiContext );
  const { startActivePatient } = useAdmin();

  const handleNewPatient = () => {
    startActivePatient({ name: '', owner: '', email: '', visitDate: '', symptoms: '' });
    startOpenModal();
  }

  return (
    <div className="">
      <div className='flex justify-end'>
        <button
          type='button'
          className='text-white bg-[#263159] hover:bg-[#324592] py-2 px-3 rounded font-medium transition-colors'
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