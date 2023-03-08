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

    case types.onRegister:
      return {
        ...state,
        status: 'not-uthenticated',
        successMessage: payload,
        errorMessage: null,
      }
    
    case types.onClearSuccessMessage:
      return {
        ...state,
        successMessage: null,
      }

    case types.onForgotPassword:
      return {
        ...state,
        status: 'not-uthenticated',
        successMessage: payload,
        errorMessage: null,
      }

    case types.onSystem:
      return {
        ...state,
        status: 'not-uthenticated',
        errorMessage: null,
        errorSystem: payload,
      }
  
    default:
      state;
  }
}