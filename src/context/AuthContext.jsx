import { useReducer, useState, createContext } from "react";

import { petCenterApi } from "../api";
import { types } from "../types";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

const initialState = {
  status: "init",
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

      const { _id, name, lastname, phone } = data;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone } });

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
      
      const { _id, name, lastname, email, phone } = data;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone } });

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
      console.log(data.msg);

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startForgotPassword = async ({ email }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post( "/auth/forgot-password", { email } );
      console.log(data.msg);
      dispatch({ type: types.onForgotPassword, payload: data.msg });

    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  }

  const startValidateToken = async ( token ) => {
    try {
      const { data } = await petCenterApi.get( `/auth/reset-password/${token}` );
      console.log(data);
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

  /* useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await petCenterApi("/veterinarios/perfil", config);

        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []); */

/*   const editProfile = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await petCenterApi.put(
        `/veterinarios/perfil/${datos._id}`,
        datos,
        config
      );
      return { msg: "Almacenado Correctamente", error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  }; */

/*   const saveNewPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await petCenterApi.put(
        "/veterinarios/actualizar-password",
        datos,
        config
      );

      return { msg: data.msg, error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  }; */

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
    }} >
      {children}
    </AuthContext.Provider>
  );
};
