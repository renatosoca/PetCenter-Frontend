import { petCenterApi } from '@/app.globals'
import { IResponseLogin, ISignIn } from '../domain'
import { COOKIE_NAMES, decodedToken, ErrorHandler, setCookie } from '@/shared/utils'
import { IUser } from '@/domain'

interface signInProps {
  user: IUser | undefined
  error: ErrorHandler<string> | undefined
}

const signIn = async (data: ISignIn): Promise<signInProps> => {
  const params = structuredClone(data)
  try {
    const { data } = await petCenterApi.post<{ jwt: string }>('/auth/login', params)

    setCookie(COOKIE_NAMES.auth, data.jwt)

    const { user } = decodedToken<{ user: IResponseLogin }>(data.jwt)!

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      error: undefined
    }
  } catch (error: unknown) {
    return {
      user: undefined,
      error: ErrorHandler.fromAxiosError<string>({ error, title: 'Sign In Error' })
    }
  }
}

export const SignInService = { signIn }
