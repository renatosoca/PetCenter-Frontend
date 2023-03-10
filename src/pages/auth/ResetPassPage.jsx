import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm, useResetPassword } from '../../hooks';
import { LoadingSpinner, SuccessMessage, WarningMessage } from '../../components';

const initialForm = {
  password: '',
  repeatPassword: '',
}

export const ResetPassPage = () => {

  const formValitadions = {
    password: [ (password) => password.length > 7, 'La contraseña debe contener un mínimo de 8 caracteres.' ],
    repeatPassword: [ (repeatPassword, password) => repeatPassword === password, 'Las contraseñas no coinciden' ],
  }
  
  const params = useParams();
  const { token } = params;
  
  const { 
    formState, password, repeatPassword, isFormValid, passwordValid, repeatPasswordValid, onInputChange, onResetForm 
  } = useForm( initialForm, formValitadions );

  const { 
    status, errorMessage, successMessage, isFormSubmit, handleSubmit 
  } = useResetPassword( formState, isFormValid, token, onResetForm );

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
            { !!successMessage && <SuccessMessage title={ false } messageSuccess={ successMessage } /> }

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
              className="w-full p-3 bg-green-400 rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center"
              disabled={ ( status === 'loading' ) }
            >
              { status === 'loading' ? <LoadingSpinner /> : 'Crear Cuenta' }
            </button>
          </form>

          <nav className='lg:flex lg:justify-between' >
            <span
              className='font-bold block text-center my-5 text-gray-500'
            >
              ¿Ya tienes una cuenta? {''}
              <Link 
              to="/" 
              className={`text-green-400 ${ ( status === 'loading' ) ? 'pointer-events-none': '' } `}
              > 
                Inicia sesión
              </Link>
            </span>
          </nav>
        </div>
      </div>

      <div className='hidden xl:block h-full overflow-hidden bg-image-gradient-left'>
      </div>
    </>
  );
}