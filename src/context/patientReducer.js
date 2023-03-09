import { types } from "../types/types";

export const patientReducer = ( state = {}, { type, payload } ) => {
  switch (type) {
    case types.onLoadingPatient:
      return {
        ...state,
        isLoadingPatient: true,
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
        patient: payload,
      }
  
    default:
      state;
  }
}
