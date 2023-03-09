import { Link, NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

export const NavBar = ({ navActive }) => {
  return (
    <nav 
      className={`${navActive ? 'flex' : 'hidden' }  flex-col gap-2 absolute md:right-[1.6%] right-[6.5vw] bg-[#161B22] top-[100%] py-4 text-[.9rem] text-gray-700 rounded-lg after:content[''] after:absolute after:-top-2 after:rotate-45 after:w-5 after:h-5 after:bg-[#161B22] after:z-[0] after:right-4 z-[10]`}
    >
      <NavLink
        to="/admin/profile"
        className={({isActive}) => `px-4 py-1 block font-bold text-white hover:bg-blue-600 transition-colors ${ isActive ? 'bg-blue-400' : ''}`}
      >
        Perfil
      </NavLink>

      <NavLink
        to="/admin/reset-password"
        className={({isActive}) => `px-4 py-1 block font-bold text-white hover:bg-blue-600 transition-colors ${ isActive ? 'bg-blue-400' : ''}`}
      >
        Cambiar Contraseña
      </NavLink>

      <button
        type='button'
        onClick={ () => '0logout' }
        className="font-bold px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-start flex gap-1 items-center"
      >
        <BiLogOut className="text-base" />
        Cerrar Sesión
      </button>
    </nav>
  );
};
