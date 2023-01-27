import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-5xl text-center lg:px-16">
          Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className='mt-14 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form action="#">
          <div className="my-5">
            <label 
              htmlFor="email" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="Tu Correo Electronico" 
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="password" 
              className="uppercase text-gray-600 block text-xl font-semibold" >
              Clave
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="Tu Contraseña" 
              className="w-full border p-3 mt-3 bg-gray-50 rounded-xl outline-none" 
            />
          </div>

          <input 
              type="submit"
              value='Iniciar Sesión'
              className="w-full border py-3 mt-3 bg-indigo-700 rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-indigo-800" 
            />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between' >
          <Link 
            to="/registro" 
            className='font-bold block text-center my-5 text-gray-500'>
            ¿No tienes una cuenta?<span className='text-indigo-600'> Registrate</span>
        </Link>

          <Link 
            to="/olvide-password" 
            className='font-bold block text-center my-5 text-gray-500'>
            Recuperar mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;