import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/axios';

const NewPassword = () => {
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ objAlert, setObjAlert ] = useState({});
  const [ tokenValid, setTokenValid ] = useState(false);
  const [ confirmPassword, setConfirmPassword ] = useState(false);
  
  const params = useParams();
  const { token } = params;

  useEffect( () => {
    const checkToken = async () => {
      try {
        await clienteAxios( `/veterinarios/olvide-password/${token}` );
        setObjAlert( { msg: 'Coloca tu Nueva Contraseña', error: false } );
        setTokenValid( true );
      } catch (error) {
        setObjAlert( { msg: 'Hubo un Error con el enlace', error: true} )
      }
    };
    checkToken();
  }, []);

  const handleSubmitNewPassword = async e => {
    e.preventDefault();
    if ( !password ) return setObjAlert( { msg: 'La contraseña es Obligatorio', error: true });
    if ( !repeatPassword ) return setObjAlert( { msg: 'Por favor Confirma tu Contraseña', error: true });
    if ( password !== repeatPassword ) return setObjAlert( { msg: 'Las contraseñas no son iguales', error: true });
    if ( password.length < 6 && repeatPassword.length < 6 ) return setObjAlert( { msg: 'Su contraseña tiene que ser mínimo 6 caracteres', error: true });

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post( url, { password } );

      setObjAlert( { msg: data.msg, error:false } );

      setConfirmPassword( true );
    } catch (error) {
      setObjAlert( { msg: error.response.data.msg, error:true } )
    };
  };

  const { msg } = objAlert;

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
         Reestablece tu Contraseña y sigue administrando a tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && <Alert objAlert={objAlert} /> }

        { tokenValid && (
          <form onSubmit={handleSubmitNewPassword}>
            <div className="my-5">
              <label 
                htmlFor="password" 
                className="uppercase text-gray-600 block text-xl font-semibold" >
                Nueva Contraseña
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
                Confirmar Nueva Contraseña
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
                value='Actualizar Contraseña'
                className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
              />
          </form>
        ) }

        { confirmPassword && 
          <nav className='mt-10 lg:flex lg:justify-between' >
            <Link 
              to="/"
              className='font-bold block text-center my-5 text-gray-500'>
              Iniciar Sesión
            </Link>
          </nav>
        }
      </div>
    </>
  );
};

export default NewPassword;