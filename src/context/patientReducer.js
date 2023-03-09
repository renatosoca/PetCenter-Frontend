import { types } from "../types/types";

export const patientReducer = ( state = {}, { type, payload } ) => {
  switch (type) {
    case types.onLoadingPatients:
      return {
        ...state,
        isLoadingPatients: true,
        activePatient: null,
      }
    
    case types.onLoadingAction:
      return {
        ...state,
        isLoadingAction: true,
      }

    case types.onClearSavedPatient:
      return {
        ...state,
        isSavedPatient: 'notSaved',
      }

    case types.onGetPatients:
      return {
        ...state,
        patients: payload,
        isLoadingPatients: false,
        isLoadingAction: false,
      }

    case types.onActivePatient: 
      return {
        ...state,
        activePatient: payload,
        isLoadingPatients: false,
        isLoadingAction: false,
      }

    case types.onAddPatient:
      return {
        ...state,
        patients: [ payload, ...state.patients ],
        isLoadingAction: false,
        isSavedPatient: 'success',
      }
    
    case types.onUpdatePatient:
      return {
        ...state,
        patients: state.patients.map( patient => patient._id === payload._id ? payload : patient ),
        isLoadingAction: false,
        isSavedPatient: 'success'
      }
    
    case types.onDeletePatient:
      return {
        ...state,
        patients: state.patients.filter( patient => patient._id !== payload ),
        isLoadingAction: false,
        isSavedPatient: 'success'
      }
    
    case types.onLogoutPatient: 
      return {
        ...state,
        isLoadingPatients: false,
        isLoadingAction: false,
        patients: [],
        activePatient: null,
        isSavedPatient: 'notSaved',
      }
  
    default:
      state;
  }
}
