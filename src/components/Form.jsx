import { useState, useEffect } from 'react'
import Alert from './Alert';
import usePatients from '../hooks/usePatients';

const Form = () => {
    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fechaAlta, setFechaAlta ] = useState('');
    const [ sintomas, setSintomas ] = useState('');
    const [ objAlert, setObjAlert ] = useState( {} );
    const [ id, setId ] = useState( null );

    const { savePatient, patient } = usePatients();
    
    useEffect( () => {
        if ( patient?.nombre) {
            setNombre( patient.nombre );
            setPropietario( patient.propietario );
            setEmail( patient.email );
            setFechaAlta( patient.fechaAlta );
            setSintomas( patient.sintomas );
            setId( patient._id );
        }
    }, [patient]);

    const handleSubmitForm = e => {
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
    };

    const { msg } = objAlert;

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form onSubmit={ handleSubmitForm } className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'>
                <div className='mb-5'>
                    <label
                        htmlFor="nombre"
                        className='text-gray-700 font-bold uppercase'
                    >
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        id='nombre'
                        value={nombre}
                        onChange={ e => setNombre( e.target.value)}
                        placeholder='Nombre de la mascota'
                        className='border-2 w-full p-2 bg-white rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
                </div>

                <div className='mb-5'>
                    <label
                        htmlFor="propietario"
                        className='text-gray-700 font-bold uppercase'
                    >
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        id='propietario'
                        value={propietario}
                        onChange={ e => setPropietario( e.target.value)}
                        placeholder='Nombre del Propietario'
                        className='border-2 w-full p-2 bg-white rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
                </div>

                <div className='mb-5'>
                    <label
                        htmlFor="email"
                        className='text-gray-700 font-bold uppercase'
                    >
                        Email Propietario
                    </label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={ e => setEmail( e.target.value)}
                        placeholder='Email del Propietario'
                        className='border-2 w-full p-2 bg-white rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
                </div>

                <div className='mb-5'>
                    <label
                        htmlFor="fecha"
                        className='text-gray-700 font-bold uppercase'
                    >
                        Fecha Alta
                    </label>
                    <input
                        type="date"
                        id='fecha'
                        value={fechaAlta}
                        onChange={ e => setFechaAlta( e.target.value)}
                        className='border-2 w-full p-2 bg-white rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
                </div>

                <div className='mb-5'>
                    <label
                        htmlFor="sintomas"
                        className='text-gray-700 font-bold uppercase'
                    >
                        Sintomas Mascota
                    </label>
                    <textarea
                        id='sintomas'
                        value={sintomas}
                        onChange={ e => setSintomas( e.target.value)}
                        placeholder='Sintomas de la Mascota'
                        className='resize-none border-2 w-full p-2 bg-white rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
                </div>

                <input
                        type="submit"
                        value={ id ? 'Guardar Cambios' : 'Registrar Paciente'}
                        className='border-2 w-full p-2 bg-indigo-600 text-white font-bold uppercase cursor-pointer hover:bg-indigo-800 transition-colors rounded-md mt-2 placeholder-gray-400 outline-none'
                    />
            </form>

            { msg && <Alert objAlert={objAlert} />}
        </>
    )
};

export default Form;