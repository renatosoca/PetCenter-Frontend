import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alert from '../components/Alert';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState('');
  const [ objAlert, setObjAlert ] = useState({})

  const handleSubmitInstructions = async e => {
    e.preventDefault();

    if ( email === '') return setObjAlert({ msg: 'El email es Obligatorio', error: true});

    setObjAlert( {} );

    try {
      const { data } = await clienteAxios.post( '/veterinarios/olvide-password', { email } );
      setObjAlert( { msg: data.msg, error: false } );
    } catch (error) {
      setObjAlert( { msg: error.response.data.msg, error: true } );
    };
  };

  const { msg } = objAlert;

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
         Recupera tu Acceso y no Pierdas a tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && <Alert objAlert={objAlert} /> }

        <form onSubmit={ handleSubmitInstructions }>
          <div className="my-5">
            <label 
              htmlFor="email" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="email"
              value={email}
              onChange={ e => setEmail( e.target.value )}
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <input 
              type="submit"
              value='Enivar Instrucciones'
              className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
           />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between' >
          <Link 
            to="/"
            className='font-bold block text-center my-5 text-gray-500'>
            ¿Ya tienes una Cuenta?<span className='text-indigo-600'> Inicia Sesión</span>
          </Link>

          <Link 
            to="/registro" 
            className='font-bold block text-center my-5 text-gray-500'>
            ¿No tienes una cuenta?<span className='text-indigo-600'> Registrate</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgotPassword;