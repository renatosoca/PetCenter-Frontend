import { Link } from 'react-router-dom';
import { useForm, useLogin } from '../../hooks';
import { LoadingSpinner, WarningMessage } from '../../components';

const initialForm = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  const formValitadions = {
    email: [ (email) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).test(email), 'Tiene que ser un email válido.' ],
    password: [ (password) => password.length > 7, 'La contraseña debe contener un mínimo de 8 caracteres.' ],
  }

  const { 
    formState, email, password, onInputChange, isFormValid, emailValid, passwordValid, onResetForm
  } = useForm( initialForm, formValitadions );

  const { handleSubmitLogin, status, errorMessage, isFormSubmit } = useLogin( formState, isFormValid, onResetForm );

  if ( status === 'init' ) return 'Cargando...';

  return (
    <>
      <div className='px-5 py-10 max-w-xl w-full mx-auto'>
        <div >
          <h1 className='uppercase text-center italic font-bold text-6xl text-white'>Bienvenido</h1>
        </div>

        <form 
          onSubmit={ handleSubmitLogin }
          className='w-full py-16 flex flex-col gap-7 text-white relative'
        >
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
              placeholder="Tu Correo Electronico"
              name='password'
              value={ password }
              onChange={ onInputChange }
              className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] mt-2" 
            />
            <span className='text-red-500'>{ isFormSubmit && passwordValid }</span>
          </div>

          { !!errorMessage && <WarningMessage messageError={ errorMessage } /> }

          <button
            type="submit"
            className="w-full p-3 bg-green-400 rounded-[.2rem] font-bold mt-4 text-black flex items-center justify-center hover:text-white transition-colors"
            disabled={ ( status === 'loading' ) }
          >
            { status === 'loading' ? <LoadingSpinner /> : 'Iniciar Sesión' }
          </button>
        </form>

        <nav className='lg:flex lg:justify-between' >
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

          <Link 
            to="/forgot-password" 
            className={`font-bold block text-center my-5 text-green-400 ${ ( status === 'loading' ) ? 'pointer-events-none': '' }`}>
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>

      <div className='hidden xl:block h-full bg-image-gradient-left'>
      </div>
    </>
  );
};