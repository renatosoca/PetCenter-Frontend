import { types } from "../types/types";

export const uiReducer = ( state = {}, { type } ) => {
  switch (type) {
    case types.onOpenModal:
      return {
        ...state,
        modalPatient: true,
      }

    case types.onCloseModal:
      return {
        ...state,
        modalPatient: false,
      }
  
    default:
      state;
  }
}
