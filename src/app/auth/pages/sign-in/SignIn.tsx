import { Link } from 'react-router-dom'
import { Button, Input } from '@/shared/components'
import { useHandleForm } from '@/shared/hooks'
import { INITIAL_STATE_SIGNIN, ISignIn } from '../../domain'
import { SignInService } from '../../services'
import { SIGNIN_VALIDATION } from '../../validations'

const SignIn = () => {
  const { params, errors, onInputChange, onSubmit } = useHandleForm(INITIAL_STATE_SIGNIN, SIGNIN_VALIDATION)

  const handleLogin = async (data: ISignIn) => {
    console.log({ data })
    await SignInService.signIn()
  }

  return (
    <main className="flex items-center justify-center lg:grid lg:grid-cols-12 min-h-screen w-full">
      <div className="col-span-7 h-full ">
        <div className="w-full h-full bg-primary [clip-path:polygon(0%_0%,87%_0%,100%_100%,0%_100%)]"></div>
      </div>

      <div className="col-span-5 lg px-5 py-10 max-w-xl w-full mx-auto">
        <div>
          <h1 className="uppercase text-center font-bold">Bienvenido</h1>
        </div>

        <form onSubmit={onSubmit(handleLogin)} className="w-full py-16 flex flex-col gap-7 relative">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={params.email}
            onChange={onInputChange}
            error={errors && errors.email}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={params.password}
            onChange={onInputChange}
            error={errors && errors.password}
          />

          <Button type="submit">
            <span>Iniciar sesión</span>
          </Button>
        </form>

        <nav className="lg:flex lg:justify-between">
          <span className="font-bold block text-center my-5 text-gray-500">
            ¿No tienes una cuenta? {''}
            <Link to="/register" className={`text-green-400 ${status === 'loading' ? 'pointer-events-none' : ''} `}>
              Regístrate
            </Link>
          </span>

          <Link
            to="/forgot-password"
            className={`font-bold block text-center my-5 text-green-400 ${status === 'loading' ? 'pointer-events-none' : ''}`}>
            Olvidé mi contraseña
          </Link>
        </nav>
      </div>
    </main>
  )
}

export default SignIn
