import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAdmin, useAuth } from "../../hooks";

export const NavBar = ({ navActive }) => {
  const { startLogout, user } = useAuth();
  const { startLogoutPatient } = useAdmin();

  const handleClick = () => {
    startLogout();
    startLogoutPatient();
  };

  return (
    <nav
      className={`${
        navActive ? "flex" : "hidden"
      }  flex-col gap-2 absolute md:right-[1.6%] right-[6.5vw] bg-[#161B22] top-[100%] py-4 text-[.9rem] text-gray-700 rounded-lg after:content[''] after:absolute after:-top-2 after:rotate-45 after:w-5 after:h-5 after:bg-[#161B22] after:z-[0] after:right-4 z-[10]`}
    >
      <div className=" text-white px-4 border-b border-gray-400 pb-2">
        <p className="font-medium">Iniciaste como:</p>
        <span className="font-bold text-sm">
          {user?.name} {user?.lastname}
        </span>
      </div>
      <NavLink
        to="/admin/profile"
        className={({ isActive }) =>
          `px-4 py-1 block font-bold text-white hover:bg-blue-600 transition-colors ${
            isActive ? "bg-blue-400" : ""
          }`
        }
      >
        Perfil
      </NavLink>

      <NavLink
        to="/admin/reset-password"
        className={({ isActive }) =>
          `px-4 py-1 block font-bold text-white hover:bg-blue-600 transition-colors ${
            isActive ? "bg-blue-400" : ""
          }`
        }
      >
        Cambiar Contraseña
      </NavLink>

      <button
        type="button"
        onClick={handleClick}
        className="font-bold px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-start flex gap-1 items-center"
      >
        <BiLogOut className="text-base" />
        Cerrar Sesión
      </button>
    </nav>
  );
};
