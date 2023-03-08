import { types } from "../types";

export const authReducer = ( state = {}, { type, payload } ) => {
  switch ( type ) {
    case types.onChecking:
      return {
        ...state,
        status: 'loading',
        user: {},
        errorMessage: null,
      }

    case types.onLogin:
      return {
        ...state,
        status: 'authenticated',
        user: payload,
        errorMessages: null,
      }

    case types.onclearMessageError:
      return {
        ...state,
        errorMessage: null,
      }

    case types.onLogout:
      return {
        ...state,
        status: 'not-uthenticated',
        errorMessage: payload,
      }
  
    default:
      state;
  }
}