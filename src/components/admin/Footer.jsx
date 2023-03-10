export const Footer = () => {
  return (
    <footer className="py-10">
      <p className="text-center text-[.65rem] font-medium">
        <span className=" font-bold text-indigo-500 uppercase">Centro Veterinaria </span>
        Todos los derechos reservados © { new Date().getFullYear() }
      </p>
    </footer>
  )
}