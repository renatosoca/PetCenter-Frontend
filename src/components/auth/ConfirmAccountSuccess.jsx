import { Link } from "react-router-dom"

export const ConfirmAccountSuccess = () => {
  return (
    <div>
      <p className='pt-8 font-medium'>
        Tu cuenta ha sido confirmada correctamente.
      </p>

      <p className='font-medium pb-8'>
        Ahora puedes acceder y disfrutar de todos los beneficios de la plataforma de
        <span className='text-green-500 font-bold'> Centro Veterinario.</span> 
      </p>

      <Link 
        to="/"
        className='block w-full bg-green-400 text-black text-center p-2 hover:text-white transition-colors'
        target='_blank'
      >
        <span className=''> Inicia Sesión</span>
      </Link>
    </div>
  )
}
