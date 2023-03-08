export const ConfirmAccountError = ({ messageError }) => {
  return (
    <div className="py-6">
      <p className='font-medium'>
        Ocurrio un problema al intentar confirmar su cuenta en nuestra plataforma
        <span className='text-green-500 font-bold'> Centro Veterinario.</span> 
      </p>

      <p className="text-gray-700 text-base pt-1">Mensaje del error:</p>
      <p className="font-bold text-red-400 pb-1">
        { !!messageError ? messageError : 'Cargando mensage...' }
      </p>

      <p className="font-normal text-xs text-gray-700">
        Si a ocurrido un error vuelva a intentarlo mas tarde o comuniquese con el administrador de la plataforma. 
      </p>
    </div>
  )
}
