import { createContext, useReducer } from 'react';

import { types } from '../types';
import { uiReducer } from './uiReducer';

export const UiContext = createContext();

const initialState = {
  modalPatient: false,
}

export const UiProvider = ({ children }) => {
  const [ uiState, dispatch ] = useReducer( uiReducer, initialState );

  const startOpenModal = () => {
    dispatch({ type: types.onOpenModal });
  }

  const startCloseModal = () => {
    dispatch({ type: types.onCloseModal });
  }

  return (
    <UiContext.Provider value={{
      ...uiState,

      startOpenModal,
      startCloseModal,
    }}>
      {children}
    </UiContext.Provider>
  )
}
