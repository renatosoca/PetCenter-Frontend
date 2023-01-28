import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';
import clienteAxios from '../config/axios';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ objAlert, setObjAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmitLogin = async e => {
    e.preventDefault();

    if ( [email, password].includes('') ) return setObjAlert({ msg: 'Todos los Campos son Obligatorios', error:true });
    if ( password.length < 6 ) return setObjAlert({ msg: 'La contraseña tiene que tener un mínimo de 6 caracteres', error:true });
    setObjAlert({});

    try {
      const { data } = await clienteAxios.post( '/veterinarios/login', { email, password });
      localStorage.setItem( 'token', data.token );
      setAuth( data );
      
      navigate('/admin')
    } catch (error) {
      setObjAlert( { msg: error.response.data.msg, error: true } );
    };
  };

  const { msg } = objAlert;
  
  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
          Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alert objAlert={objAlert} />}
        <form onSubmit={ handleSubmitLogin }>
          <div className="my-5">
            <label 
              htmlFor="email" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="Tu Correo Electronico"
              value={email}
              onChange={ e => setEmail( e.target.value ) }
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="password" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Clave
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="Tu Contraseña"
              value={password}
              onChange={ e => setPassword( e.target.value ) }
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <input 
              type="submit"
              value='Iniciar Sesión'
              className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
            />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between' >
          <Link 
            to="/registro" 
            className='font-bold block text-center my-5 text-gray-500'>
            ¿No tienes una cuenta?<span className='text-indigo-600'> Registrate</span>
          </Link>

          <Link 
            to="/olvide-password" 
            className='font-bold block text-center my-5 text-gray-500'>
            Recuperar mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;