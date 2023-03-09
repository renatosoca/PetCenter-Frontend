export const LoadingPage = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-700 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-gray-100"></div>
        <div className="font-bold text-white">Cargando...</div>
      </div>
    </div>
  )
}
