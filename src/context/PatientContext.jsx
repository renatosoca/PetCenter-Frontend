import { useEffect } from "react";
import { createContext, useReducer } from "react"
import { petCenterApi } from "../api";
import { useAuth } from "../hooks";
import { types } from "../types";
import { patientReducer } from "./patientReducer";

export const PatientContext = createContext();

const initialState = {
  isLoadingPatients: false,
  isLoadingAction: false,
  patients: [],
  activePatient: null,
  isSavedPatient: 'notSaved',
}

//Show Error Message - Optionals
export const PatientProvider = ({ children }) => {
  const [ patientState, dispatch ] = useReducer( patientReducer, initialState );
  const { user } = useAuth();

  useEffect(() => {
    const startGetPatients = async () => {
      try {
        dispatch({ type: types.onLoadingPatients });

        const { data } = await petCenterApi.get( '/patient' );
        dispatch( { type: types.onGetPatients, payload: data.patients } )

      } catch (error) {
        console.error(error.response.data.msg);
      }
    }
    startGetPatients();
  }, [user])
  
  const startActivePatient = ( patient ) => {
    dispatch( { type: types.onActivePatient, payload: patient } );
  }

  //Show Error Message - Optionals
  const startSavedPatient = async ( payload ) => {
    try {
      dispatch({ type: types.onLoadingAction });

      if ( payload._id ) {
  
        const { data } = await petCenterApi.put( `/patient/${ payload._id }`, payload );
        dispatch( { type: types.onUpdatePatient, payload: data.patient } );
          
        return;
      }

      const { data } = await petCenterApi.post( '/patient', payload );
      dispatch( { type: types.onAddPatient, payload: data.patient } );
      
    } catch (error) {
      console.error(error.response.data.msg)
    }
  }

  //Show Error Message - Optionals
  const startDeletePatient = async ( _id ) => {
    try {
      dispatch({ type: types.onLoadingAction });
      
      await petCenterApi.delete( `/patient/${_id}` );
      dispatch( { type: types.onDeletePatient, payload: _id } );
      
    } catch (error) {
      console.error(error.response)
    }
  }

  const startLogoutPatient = async () => {
    dispatch({ type: types.onLogoutPatient });
  }

  return (
    <PatientContext.Provider value={{
      ...patientState,

      startActivePatient,
      startSavedPatient,
      startDeletePatient,
      startLogoutPatient,
    }}>
      {children}
    </PatientContext.Provider>
  )
}
