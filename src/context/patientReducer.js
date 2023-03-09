import { types } from "../types/types";

export const patientReducer = ( state = {}, { type, payload } ) => {
  switch (type) {
    case types.onLoadingPatient:
      return {
        ...state,
        isLoadingPatients: true,
        activePatient: null,
      }

    case types.onGetPatients:
      return {
        ...state,
        patients: payload,
      }

    case types.onAddPatient:
      return {
        ...state,
        patients: [ payload, ...state.patients ],
      }
  
    default:
      state;
  }
}
