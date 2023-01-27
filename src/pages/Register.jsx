import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import Alert from '../components/Alert';

const Register = () => {
  const [ nombre, setNombre] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ repeatPassword, setRepeatPassword] = useState('');
  const [ objAlert, setObjAlert ] = useState({});

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if ( [nombre, email, password, repeatPassword].includes('')) return setObjAlert( { msg: 'Todos los Campos son Obligatorios', error: true} );
    if (password !== repeatPassword) return setObjAlert( { msg: 'Las Contraseñas no Coinciden', error: true} );
    if (password.length < 6 ) return setObjAlert( { msg: 'La contraseña tiene que tener un mínimo de 6 caracteres', error: true} );

    setObjAlert( {} );
    //Crear el usuario en la API
    try {
      await clienteAxios.post( '/veterinarios', {nombre,email,password});
      setObjAlert( { msg:'Registrado Correctamente, revisa tu Correo', error: false} )
    } catch (error) {
      setObjAlert( { msg: error.response.data.msg, error: true } );
    }
  }

  const { msg } = objAlert;

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
         Crea tu cuenta y administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alert objAlert={objAlert} /> }
        <form onSubmit={handleSubmitRegister}>
          <div className="my-5">
            <label 
              htmlFor="name" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Nombre
            </label>
            <input 
              type="text" 
              id="name" 
              placeholder="Tu Nombre"
              value={nombre}
              onChange={e => setNombre( e.target.value )}
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

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
              onChange={e => setEmail( e.target.value )}
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
              onChange={e => setPassword( e.target.value )}
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="repeatPassword" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Confirmar Clave
            </label>
            <input 
              type="password" 
              id="repeatPassword" 
              placeholder="Confirmar Contraseña"
              value={repeatPassword}
              onChange={e => setRepeatPassword( e.target.value )}
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <input 
              type="submit"
              value='Registrame'
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
            to="/olvide-password" 
            className='font-bold block text-center my-5 text-gray-500'>
            Recuperar mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Register