import { Link } from 'react-router-dom' // React Router para la navegación

// Imágenes estáticas
const errorImage = '/static/media/error404.png'
const conesImage = '/static/media/twoCone.png'

// Componente de la página de error 404
const NotFoundPage = () => {
  const { user } = { user: 'renato' } // Obtenemos el estado del usuario desde el hook de autenticación

  return (
    <main className="min-h-screen flex bg-bgDefault justify-center items-center overflow-hidden">
      <section className="max-w-[20rem] md:max-w-[40rem] w-full flex-grow-0">
        {/* Sección con imágenes */}
        <div className="pb-20 flex justify-center relative">
          <img src={errorImage} alt="Image not found" />
          <div className="w-[10rem] md:w-[20rem] h-[10rem] md:h-[20rem] absolute bottom-[-10%] left-[90%]">
            <img src={conesImage} alt="Conos para la vista" />
          </div>
        </div>

        {/* Título y descripción del error */}
        <div className="mb-4 flex justify-center">
          <div className="max-w-[25rem]">
            <h1 className="font-bold text-2xl md:text-4xl text-center text-[#333] mb-4">Página no encontrada</h1>
            <p className="text-wrap text-disabled text-center text-xs md:text-sm">
              La página que estás buscando fue movida, eliminada, renombrada o puede que nunca exista.
            </p>
          </div>
        </div>

        {/* Botón para volver al inicio */}
        <div className="flex justify-center">
          <Link
            to={user ? '/dashboard' : '/login'} // Si el usuario está autenticado, redirige al dashboard, si no, al login
            className="text-blue-500 hover:text-blue-700">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
