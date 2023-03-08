import { Link } from 'react-router-dom';

import { LoadingSpinner, WarningMessage } from '../../components';
import { useForm, useRegister } from '../../hooks';

const initialForm = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  password: '',
  repeatPassword: '',
}

export const RegisterPage = () => {

  const formValitadions = {
    name: [ (name) => name.length > 0, 'El nombre es obligatorio.' ],
    lastname: [ (lastname) => lastname.length > 0, 'El apellido es obligatorio.' ],
    email: [ (email) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/).test(email), 'Tiene que ser un email válido.' ],
    phone: [ (phone) => phone.length > 8, 'La telefono debe contener un mínimo de 9 caracteres.' ],
    password: [ (password) => password.length > 7, 'La contraseña debe contener un mínimo de 8 caracteres.' ],
    repeatPassword: [ (repeatPassword, password) => repeatPassword !== password > 7, 'Las contraseñas no coinciden.' ],
  }
  
  const { formState, name, lastname, phone, email, password, repeatPassword, onInputChange, isFormValid, nameValid, lastnameValid, emailValid, phoneValid, passwordValid, repeatPasswordValid } = useForm( initialForm, formValitadions );

  const { status, errorMessage, isFormSubmit, handleSubmitRegister } = useRegister( formState, isFormValid );

  return (
    <>
      <div className='hidden xl:block h-full overflow-hidden'>
        <div className='bg-image-gradient-rigth h-full'></div>
      </div>

      <div className='w-full overflow-y-scroll scrollbar-hidden'>
        <div className='px-5 py-10 max-w-xl w-full mx-auto'>
          <div >
            <h1 className='uppercase text-center italic font-bold text-6xl text-white'>Registro</h1>
          </div>

          <form 
            onSubmit={ handleSubmitRegister }
            className='w-full py-10 flex flex-col gap-4 text-white relative'
          >
            <div className='flex gap-6'>
              <div className="flex-1">
                <label 
                  htmlFor="name"
                  className=' text-xs'
                >
                  Nombres
                </label>

                <input 
                  type="text" 
                  id="name" 
                  placeholder="Tu nombre Nombreto"
                  name='name'
                  value={ name }
                  onChange={ onInputChange }
                  className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36]" 
                />
                <span className='text-red-500'>{ isFormSubmit && nameValid }</span>
              </div>

              <div className="flex-1">
                <label 
                  htmlFor="lastname"
                  className=' text-xs'
                >
                  Apellidos
                </label>
                <input 
                  type="text" 
                  id="lastname" 
                  placeholder="Tu Correo Electronico"
                  name='lastname'
                  value={ lastname }
                  onChange={ onInputChange }
                  className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36]" 
                />
                <span className='text-red-500'>{ isFormSubmit && lastnameValid }</span>
              </div>
            </div>
            
            <div className="">
              <label 
                htmlFor="phone"
                className=' text-xs'
              >
                Telefono
              </label>

              <input 
                type="tel" 
                id="phone" 
                placeholder="Tu número de celular"
                name='phone'
                value={ phone }
                onChange={ onInputChange }
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] " 
              />
              <span className='text-red-500'>{ isFormSubmit && phoneValid }</span>
            </div>

            <div className="">
              <label 
                htmlFor="email"
                className=' text-xs'
              >
                Correo electrónico
              </label>

              <input 
                type="email" 
                id="email" 
                placeholder="Tu número de celular"
                name='email'
                value={ email }
                onChange={ onInputChange }
                className="w-full py-[0.65rem] px-3 rounded-[.2rem] outline-none bg-[#2E2F36] " 
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

            <Link 
              to="/auth/forgot-password" 
              className='font-bold block text-center my-5 text-[#00FFF6]'>
              Olvidé mi contraseña
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}