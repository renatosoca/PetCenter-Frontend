import usePatients from "../hooks/usePatients";

const Patients = ({patient}) => {
    const { setEdition, deletePatient } = usePatients();

    const { nombre, propietario, email, fechaAlta, sintomas, _id } = patient;

    const FormatDate = ( date ) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(newDate);
    }

  return (
    <>
        <div className="bg-white mx-5 my-10 px-5 py-6 shadow-md rounded-xl text-indigo-600">
            <p className="font-bold uppercase">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase">Correo: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase">Fecha Alta: {''}
                <span className="font-normal normal-case text-black">{FormatDate( fechaAlta )}</span>
            </p>
            <p className="font-bold uppercase">Sintomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button
                onClick={ () => setEdition( patient ) }
                    className="bg-indigo-500 text-white font-bold px-10 py-2 rounded-lg uppercase hover:bg-indigo-700 transition-colors"
                >
                    Editar
                </button>

                <button
                onClick={ () => deletePatient( patient )}
                    className="bg-red-500 text-white font-bold px-10 py-2 rounded-lg uppercase hover:bg-red-700 transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </div>
    </>
  )
}

export default Patients