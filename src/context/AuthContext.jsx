import { useReducer, createContext } from "react";

import { petCenterApi } from "../api";
import { types } from "../types";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

const initialState = {
  status: "init",
  isLoading: 'none',
  user: {},
  errorMessage: null,
  successMessage: null,
  errorSystem: null,
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const startLogin = async ({ email, password} ) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post( "/auth/login", { email, password } );
      localStorage.setItem( "token", data.jwt );
      localStorage.setItem( "time-token-start", new Date().getTime() );

      const { _id, name, lastname, phone, webPage } = data;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone, webPage } });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("time-token-start");

    dispatch({ type: types.onLogout });
  }
  
  const startRegister = async ({ name, lastname, email, phone, password }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post( "/auth/register", { name, lastname, email, password, phone } );
      dispatch({ type: types.onRegister, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startChecking = async () => {
    const token = localStorage.getItem("token") || null;
    if ( !token ) return dispatch({ type: types.onLogout });
    
    try {
      const { data } = await petCenterApi.get( "/auth/renew" );
      localStorage.setItem( "token", data.jwt );
      localStorage.setItem( "time-token-start", new Date().getTime() );
      
      const { _id, name, lastname, email, phone, webPage } = data;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone, webPage } });

    } catch (error) {
      dispatch({ type: types.onSystem, payload: error.response.data.msg });
    }
  }

  const startClearMessageError = () => {
    dispatch({ type: types.onclearMessageError });
  }

  const startClearMessageSuccess = () => {
    dispatch({ type: types.onClearSuccessMessage });
  }

  const startConfirmAccount = async (token) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.get( `/auth/confirm/${token}` );
      dispatch({ type: types.onRegister, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startForgotPassword = async ({ email }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post( "/auth/forgot-password", { email } );
      dispatch({ type: types.onForgotPassword, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  //Opcional
  const startValidateToken = async ( token ) => {
    try {

      const { data } = await petCenterApi.get( `/auth/reset-password/${token}` );
      
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startResetPassword = async ({ token, password }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post( `/auth/reset-password/${token}`, { password } );
      dispatch({ type: types.onRegister, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  //Privates
  const startUpdateProfile = async ( payload ) => {
    try {
      dispatch({ type: types.onLoadingUser });
      
      const { data } = await petCenterApi.put( `/auth/profile/${ payload._id }`, payload );
      dispatch({ type: types.onUpdateUser, payload: data.user });
      dispatch({ type: types.onShowMessageSuccess, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onShowMessageError, payload: error.response.data.msg });
    }
  }

  const startUpdatePassProfile = async ( payload ) => {
    try {
      dispatch({ type: types.onLoadingUser });

      const { data } = await petCenterApi.put( '/auth/password-profile', payload );
      dispatch({ type: types.onShowMessageSuccess, payload: data.msg });
      console.log(data);

    } catch (error) {
      console.log(error)
      dispatch({ type: types.onShowMessageError, payload: error.response.data.msg })
    }
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      authState,

      startLogin,
      startLogout,
      startRegister,
      startChecking,
      startClearMessageError,
      startClearMessageSuccess,
      startConfirmAccount,
      startForgotPassword,
      startValidateToken,
      startResetPassword,

      startUpdateProfile,
      startUpdatePassProfile,
    }} >
      {children}
    </AuthContext.Provider>
  );
};
