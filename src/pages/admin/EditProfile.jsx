import { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminNav'
import { useForm, useAuth } from '../../hooks';
import Alert from '../../components/Alert';

const EditProfile = () => {
    const { auth, editProfile } = useAuth();

    const [ profile, setProfile ] = useState({});
    const [ objAlert, setObjAlert ] = useState({});

    useEffect( () => {
        setProfile( auth );
    }, [ auth ]);

    const handleSubmitProfile = async e => {
        e.preventDefault();

        const { nombre, email} = profile;
        if ( [nombre, email].includes('') ) return setObjAlert( { msg: 'El Email y El nombre son Obligatorios', error:true } );

        const resultado = await editProfile( profile );
        setObjAlert( resultado );
    };

    const { msg } = objAlert;

    return (
        <>
            <AdminNav />

            <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
            <p
                className='text-xl mt-5 mb-10 text-center'
            >
                Modifica tu {''}<span className='text-indigo-500 font-bold'>Información</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                    { msg && <Alert objAlert={objAlert} /> }

                    <form onSubmit={ handleSubmitProfile}>
                        <div className='mb-3'>
                            <label htmlFor="nombre" className='uppercase font-bold text-gray-500'>
                                Nombre
                            </label>
                            <input
                                type="text"
                                className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                placeholder='Tu Nombre'
                                name='nombre'
                                id='nombre'
                                value={profile.nombre || ''}
                                onChange={ e => setProfile({ 
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="email" className='uppercase font-bold text-gray-500'>
                                Correo
                            </label>
                            <input
                                type="email"
                                className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                placeholder='Tu Email'
                                name='email'
                                id='email'
                                value={profile.email || ''}
                                onChange={ e => setProfile({ 
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="phone" className='uppercase font-bold text-gray-500'>
                                Telefono
                            </label>
                            <input
                                type="tel"
                                className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                placeholder='Tu Telefono'
                                name='telefono'
                                id='phone'
                                value={profile.telefono || ''}
                                onChange={ e => setProfile({ 
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="web" className='uppercase font-bold text-gray-500'>
                                web
                            </label>
                            <input
                                type="text"
                                className='outline-none border bg-gray-50 w-full p-2 mt-3 rounded-lg'
                                placeholder='Tu Pagina Web'
                                name='web'
                                id='web'
                                value={profile.web || ''}
                                onChange={ e => setProfile({ 
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value='Actualizar Perfil'
                            className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;