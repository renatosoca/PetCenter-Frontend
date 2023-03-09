import { createContext, useReducer } from "react"
import { petCenterApi } from "../api";
import { types } from "../types";
import { patientReducer } from "./patientReducer";

export const PatientContext = createContext();

const initialState = {
  isLoadingPatient: false,
  patients: [],
  activePatient: null,
}

export const PatientProvider = ({ children }) => {
  const [ patientState, dispatch ] = useReducer( patientReducer, initialState );

  const startGetPatients = async () => {
    try {
      dispatch({ type: types.onLoadingPatient });

      const { data } = await petCenterApi.get( '/patient' );
      console.log(data.patients);
    } catch (error) {
      console.error(error.response.data.msg);
    }
  }

  const startAddPatient = async ( patient ) => {
    try {
      dispatch({ type: types.onLoadingPatient });

      const { data } = await petCenterApi.post( '/patient', patient );
      console.log(data);
      
    } catch (error) {
      console.error(error.response.data.msg)
    }
  }

  return (
    <PatientContext.Provider value={{
      ...patientState,

      startGetPatients,
      startAddPatient
    }}>
      {children}
    </PatientContext.Provider>
  )
}
