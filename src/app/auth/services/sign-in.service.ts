import { petCenterApi } from '@/app.globals'

const signIn = async () => {
  try {
    const response = await petCenterApi.get('/auth/login')
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const SignInService = { signIn }
