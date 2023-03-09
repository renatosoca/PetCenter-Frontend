import { useContext, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { CgMenuRight } from 'react-icons/cg';

import { NavBar } from './NavBar';
import { AuthContext } from '../../context';

export const Header = () => {
  
  const { user } = useContext(AuthContext);

  const [ isNavbar, setIsNavbar ] = useState(false );
  const [ isSettings, setIsSettings ] = useState(false );
  
  return (
    <header className="relative py-5 bg-[#263159]">
      <div className="container mx-auto flex gap-5 md:flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-white text-center">
          Centro Veterinario
        </h1>

        <nav 
          className={`${ isNavbar ? 'absolute' : 'hidden' } md:block  md:static bg-gray-100 md:bg-inherit top-full right-0 left-0 flex flex-col md:flex-row items-center justify-center gap-2 py-10 md:py-0 text-[1.1rem] text-gray-500 md:text-slate-300`}
        >
          <NavLink 
            to='/admin/' 
            className={({isActive}) => `w-full text-center rounded-none font-medium transition-all ${isActive ? 'bg-gray-300 md:bg-inherit md:bg-gray-500': ''} py-1 px-3 md:rounded-sm md:hover:text-white hover:text-black transition-colors`}
          >
            Pacientes
          </NavLink>
          
          <NavLink 
              to='/admin/profile' 
              className={({isActive}) => `w-full text-center rounded-none font-medium transition-all ${isActive ? 'bg-gray-300 md:bg-inherit md:bg-gray-500': ''} py-1 px-3 md:rounded-sm md:hover:text-white hover:text-black transition-colors`}
          >
            Perfil
          </NavLink>
        </nav>

        <div className=' flex items-center justify-center gap-2 '>
          <div className=' flex items-center justify-center gap-2 text-white '>
            <span className='font-bold text-base'>{ user?.name } { (user?.lastname) }</span>
            <button>
              <RxAvatar 
                onClick={ () => setIsSettings(!isSettings) }
                className={`text-3xl cursor-pointer rounded-full ${ isSettings ? 'bg-gray-500' : 'bg-inherit' } }`} 
              />
            </button>
          </div>

          <button
            onClick={ () => setIsNavbar(!isNavbar) }
            className={`md:hidden text-[1.3rem] cursor-pointer rounded-full p-1 ${ isNavbar ? 'bg-gray-500' : 'bg-inherit' }` }
          >
            <CgMenuRight className='text-white font-extrabold' />
          </button>
        </div>

        <NavBar navActive={ isSettings } />
      </div>
    </header>
  )
}