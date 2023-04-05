import { useContext } from "react";
import { createContext, useReducer } from "react"
import { petCenterApi } from "../api";
import { initialStatePatientContext } from "../data";
import { types } from "../types";
import { patientReducer } from "./patientReducer";
import { UiContext } from "./UiContext";

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const { startCloseModal } = useContext( UiContext );
  const [ patientState, dispatch ] = useReducer( patientReducer, initialStatePatientContext );
  
  const startGetPatients = async () => {
    try {
      dispatch({ type: types.onLoadingPatients });

      const { data } = await petCenterApi.get( '/patient' );
      dispatch( { type: types.onGetPatients, payload: data.patients } )

    } catch (error) {
      console.error(error.response.data.msg);
    }
  }
  
  const startActivePatient = ( patient ) => {
    dispatch( { type: types.onActivePatient, payload: patient } );
  }

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
    } finally {
      startCloseModal();
    }
  }

  const startDeletePatient = async ( _id ) => {
    try {
      dispatch({ type: types.onLoadingAction });
      
      await petCenterApi.delete( `/patient/${_id}` );
      dispatch( { type: types.onDeletePatient, payload: _id } );
      
    } catch (error) {
      console.error(error.response)
    }
  }

  const startLogoutPatient = () => {
    dispatch({ type: types.onLogoutPatient });
  }

  return (
    <PatientContext.Provider value={{
      ...patientState,

      startGetPatients,
      startActivePatient,
      startSavedPatient,
      startDeletePatient,
      startLogoutPatient,
    }}>
      {children}
    </PatientContext.Provider>
  )
}
