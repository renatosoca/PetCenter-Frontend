import { createContext, useReducer } from "react"
import { petCenterApi } from "../api";
import { types } from "../types";
import { patientReducer } from "./patientReducer";

export const PatientContext = createContext();

const initialState = {
  isLoadingPatients: false,
  patients: [],
  activePatient: null,
}

export const PatientProvider = ({ children }) => {
  const [ patientState, dispatch ] = useReducer( patientReducer, initialState );

  const startGetPatients = async () => {
    try {
      dispatch({ type: types.onLoadingPatient });

      const { data } = await petCenterApi.get( '/patient' );
      dispatch( { type: types.onGetPatients, payload: data.patients } )

    } catch (error) {
      console.error(error.response.data.msg);
    }
  }

  const startAddPatient = async ( payload ) => {
    try {
      dispatch({ type: types.onLoadingPatient });

      const { data } = await petCenterApi.post( '/patient', payload );
      dispatch( { type: types.onAddPatient, payload: data.patient } );
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
