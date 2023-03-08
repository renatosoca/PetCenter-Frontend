import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import {petCenterApi} from '../../api';
import { useForm, useNewPassword } from '../../hooks';
import { LoadingSpinner, WarningMessage } from '../../components';

const initialForm = {
  password: '',
  repeatPassword: '',
}

export const ResetPassPage = () => {

  const formValitadions = {
    password: [ (password) => password.length > 7, 'La contraseña debe contener un mínimo de 8 caracteres.' ],
    repeatPassword: [ (repeatPassword, password) => repeatPassword !== password, 'Las contraseñas no coinciden' ],
  }
  
  const { 
    formState, password, repeatPassword, isFormValid, passwordValid, repeatPasswordValid, onInputChange, onResetForm 
  } = useForm( initialForm, formValitadions );

  const { status, errorMessage, isFormSubmit, handleSubmit } = useNewPassword( formState, isFormValid, onResetForm );
  
  const params = useParams();
  const { token } = params;

  /* useEffect( () => {
    const checkToken = async () => {
      try {
        await petCenterApi( `/veterinarios/olvide-password/${token}` );
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
      const { data } = await petCenterApi.post( url, { password } );

      setObjAlert( { msg: data.msg, error:false } );

      setConfirmPassword( true );
    } catch (error) {
      setObjAlert( { msg: error.response.data.msg, error:true } )
    };
  };

  const { msg } = objAlert; */

  return (
    <>
      <div className='w-full overflow-y-scroll scrollbar-hidden'>
        <div className='px-5 py-10 max-w-xl w-full mx-auto'>
          <div >
            <h1 className='uppercase text-center italic font-bold text-4xl lg:text-5xl xl:text-6xl text-white'>Nueva Contraseña</h1>
          </div>

          <form 
            onSubmit={ handleSubmit }
            className='w-full py-10 flex flex-col gap-4 text-white relative'
          >
            <div className="">
              <label 
                htmlFor="password"
                className=' text-xs'
              >
                Contraseña
              </label>

              <input 
                type="password" 
                id="password" 
                placeholder="Tu contraseña"
                name='password'
                value={ password }
                onChange={ onInputChange }
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] " 
              />
              <span className='text-red-500'>{ isFormSubmit && passwordValid }</span>
            </div>

            <div className="">
              <label 
                htmlFor="repeatPassword"
                className=' text-xs'
              >
                Repetir contraseña
              </label>

              <input 
                type="password" 
                id="repeatPassword" 
                placeholder="Tu contraseña"
                name='repeatPassword'
                value={ repeatPassword }
                onChange={ onInputChange }
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] " 
              />
              <span className='text-red-500'>{ isFormSubmit && repeatPasswordValid }</span>
            </div>

            { errorMessage && <WarningMessage messageError={ errorMessage } /> }

            <button
              type="submit"
              className="w-full p-3 bg-[#00FFF6] rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center"
            >
              { status === 'loading' ? <LoadingSpinner /> : 'Crear Cuenta' }
            </button>
          </form>

          <nav className='lg:flex lg:justify-between' >
            <Link 
              to="/auth" 
              className='font-bold block text-center my-5 text-gray-500'
            >
              ¿Ya tienes una cuenta?<span className='text-[#00FFF6]'> Inicia sesión</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className='hidden xl:block h-full overflow-hidden bg-image-gradient-left'>
      </div>
    </>
  );
}