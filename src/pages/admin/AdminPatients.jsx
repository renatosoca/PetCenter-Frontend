import { useState } from 'react'
import Form from "../../components/Form";
import PatientList from "../../components/PatientList";

const AdminPatients = () => {
  const [ showForm, setShowForm ] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type='button'
        className='bg-indigo-600 text-white font-bold p-3 rounded-md uppercase mb-10 md:hidden'
        onClick={ () => setShowForm( !showForm )}
      >
        { showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>

      <div className={`${showForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientList />
      </div>
    </div>
  )
}

export default AdminPatients