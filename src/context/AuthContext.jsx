import { useReducer, createContext } from "react";

import { petCenterApi } from "../api";
import { initialStateAuthContext } from "../data";
import { types } from "../types";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialStateAuthContext);

  const startLogin = async ({ email, password }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post("/auth/login", { email, password });
      localStorage.setItem("petToken", data.jwt);

      const user = decodedToken(data.jwt);

      const { _id, name, lastname, phone, address } = user;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone, address } });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.onLogout, payload: error?.response?.data.msg });
    }
  };

  const startLogout = async () => {
    localStorage.removeItem("petToken");

    dispatch({ type: types.onLogout });
  };

  const startRegister = async ({ name, lastname, email, phone, password }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post("/auth/register", { name, lastname, email, password, phone });
      dispatch({ type: types.onRegister, payload: data.msg });
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  };

  const startChecking = async () => {
    const token = localStorage.getItem("petToken") || "";
    if (!token) return dispatch({ type: types.onLogout });

    try {
      const { data } = await petCenterApi.get("/auth/revalidateAuth");
      localStorage.setItem("petToken", data.jwt);
      const user = decodedToken(data.jwt);

      const { _id, name, lastname, email, phone, address } = user;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone, address } });
    } catch (error) {
      console.log(error);
      dispatch({ type: types.onSystem, payload: error?.response?.data?.msg });
    }
  };

  const startClearMessageError = () => {
    dispatch({ type: types.onclearMessageError });
  };
  const startClearMessageSuccess = () => {
    dispatch({ type: types.onClearSuccessMessage });
  };
  const startConfirmAccount = async (token) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.get(`/auth/confirm-account/${token}`);
      dispatch({ type: types.onRegister, payload: data.msg });
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  };
  const startForgotPassword = async ({ email }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post("/auth/forgot-password", { email });
      dispatch({ type: types.onForgotPassword, payload: data.msg });
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  };
  const startValidateToken = async (token) => {
    try {
      await petCenterApi.get(`/auth/reset-password/${token}`);
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  };
  const startResetPassword = async ({ token, password }) => {
    try {
      dispatch({ type: types.onChecking });

      const { data } = await petCenterApi.post(`/auth/reset-password/${token}`, { password });
      localStorage.setItem("petToken", data.jwt);

      const user = decodedToken(data.jwt);

      const { _id, name, lastname, email, phone, address } = user;
      dispatch({ type: types.onLogin, payload: { _id, name, lastname, email, phone, address } });
    } catch (error) {
      dispatch({ type: types.onLogout, payload: error.response.data.msg });
    }
  };

  //Privates
  const startUpdateProfile = async (payload) => {
    try {
      dispatch({ type: types.onLoadingUser });

      const { data } = await petCenterApi.put(`/auth/profile/${payload._id}`, payload);
      dispatch({ type: types.onUpdateUser, payload: data.user });
      dispatch({ type: types.onShowMessageSuccess, payload: data.msg });
    } catch (error) {
      dispatch({ type: types.onShowMessageError, payload: error.response.data.msg });
    }
  };

  const startUpdatePassProfile = async (payload) => {
    try {
      dispatch({ type: types.onLoadingUser });

      const { data } = await petCenterApi.put(`/auth/password-profile/${payload.id}`, payload);
      dispatch({ type: types.onShowMessageSuccess, payload: data.msg });
    } catch (error) {
      dispatch({ type: types.onShowMessageError, payload: error.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const decodedToken = (token) => {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const tokenResponse = JSON.parse(jsonPayload);
  return tokenResponse;
};
