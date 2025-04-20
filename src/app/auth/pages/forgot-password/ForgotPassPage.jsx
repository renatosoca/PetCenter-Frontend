import { Link } from 'react-router-dom';
import { useForm, useForgotPassword } from '../../hooks';
import { LoadingSpinner, SuccessMessage, WarningMessage } from '../../components';
import { initialFormForgotPass, valitadionsFormForgotPass } from '../../data';

export const ForgotPassPage = () => {
  const { 
    formState, email, isFormValid, emailValid, onInputChange, onResetForm 
  } = useForm( initialFormForgotPass, valitadionsFormForgotPass );

  const { 
    status, errorMessage, successMessage, isFormSubmit, handleSubmit 
  } = useForgotPassword( formState, isFormValid, onResetForm );

  return (
    <>
      <div className='hidden xl:block h-full bg-image-gradient-rigth'>
      </div>

      <div className='px-5 py-10 max-w-xl w-full mx-auto'>
        <div >
          <h1 className='uppercase text-center italic font-bold text-3xl lg:text-5xl xl:text-6xl text-white'>Recuperar Contraseña</h1>
        </div>

        <form 
          onSubmit={ handleSubmit }
          className='w-full py-16 flex flex-col gap-7 text-white relative'
        >
          { !!successMessage && <SuccessMessage messageSuccess={ successMessage } /> }

          <div className="">
            <label 
              htmlFor="email"
              className=' text-xs'
            >Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Tu Correo Electronico"
              name='email'
              value={ email }
              onChange={ onInputChange }
              className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] mt-2" 
            />
            <span className='text-red-500'>{ isFormSubmit && emailValid }</span>
          </div>

          { errorMessage && <WarningMessage messageError={ errorMessage } /> }

          <button
            type="submit"
            className="w-full p-3 bg-green-400 rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center"
            disabled={ ( status === 'loading' ) }
          >
            { ( status === 'loading' ) ? <LoadingSpinner /> : 'Iniciar Sesión' }
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
          
          <span
            className='font-bold block text-center my-5 text-gray-500'
          >
            ¿No tienes una cuenta? {''}
            <Link 
            to="/register" 
            className={`text-green-400 ${ ( status === 'loading' ) ? 'pointer-events-none': '' } `}
            > 
              Regístrate
            </Link>
          </span>
        </nav>
      </div>
    </>
  );
};