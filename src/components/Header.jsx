import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { logout } = useAuth();
  
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col gap-5 md:flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-indigo-200 text-center">
          Administrador de pacientes de {''}<span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className='flex gap-4'>
          <Link 
            to='/admin' 
            className='text-white text-sm font-bold hover:text-slate-300 transition-all uppercase'
          >
            Pacientes
          </Link>
          
          <Link 
              to='/admin/perfil' 
              className='text-white text-sm font-bold hover:text-slate-300 transition-all uppercase'
          >
            Perfil
          </Link>

          <button
            type='button'
            onClick={ logout }
            className='text-white text-sm font-bold hover:text-slate-300 transition-all uppercase'
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header