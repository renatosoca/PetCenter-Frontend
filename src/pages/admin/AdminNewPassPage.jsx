import { useState } from "react"
import { useForm, useAuth } from '../../hooks';
import Alert from "../../components/Alert";

export const AdminNewPassPage = () => {
    const [ password, setPassword ] = useState({ currentPassword: '', newPassword: '' });
    const [ objAlert, setObjAlert ] = useState({});

    const { saveNewPassword } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
    };

    const { msg } = objAlert;

    return (
        <>

            <h2 className='font-black text-3xl text-center mt-10'>Cambiar Contraseña</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''}<span className='text-indigo-500 font-bold'>Contraseña Aquí</span></p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    { msg && <Alert objAlert={objAlert} /> }

                    <form onSubmit={ handleSubmit }>
                            <div className='mb-3'>
                                <label htmlFor="currentPassword" className='uppercase font-bold text-gray-500'>
                                    Contraseña Actual
                                </label>
                                <input
                                    type="password"
                                    className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                    placeholder='Tu Contraseña Actual'
                                    name='currentPassword'
                                    id='currentPassword'
                                    onChange={ e => setPassword( {
                                        ...password, [e.target.name]: e.target.value
                                    } ) }
                                />
                            </div>
                            
                            <div className='mb-3'>
                                <label htmlFor="newPassword" className='uppercase font-bold text-gray-500'>
                                    Nueva Contraseña
                                </label>
                                <input
                                    type="password"
                                    className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                    placeholder='Tu Nueva Contraseña'
                                    name='newPassword'
                                    id='newPassword'
                                    onChange={ e => setPassword( {
                                        ...password, [e.target.name]: e.target.value
                                    } ) }
                                />
                            </div>

                        <input 
                            type="submit"
                            value='Actualizar Contraseña'
                            className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
                        />
                    </form>
                </div>
            </div>
        </>
    );
}