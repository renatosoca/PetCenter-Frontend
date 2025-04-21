//API
export interface IResponseLogin {
  _id: string
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  address: string
  token: string
  confirmed: boolean
  createdAt: string
  updatedAt: string
}

//
export interface ISignIn {
  email: string
  password: string
}

export const INITIAL_STATE_SIGNIN = {
  email: 'u18215194@gmail.com',
  password: '123456'
}
