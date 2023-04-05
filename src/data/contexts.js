export const initialStateAuthContext = {
  status: "init",
  isLoading: 'none',
  user: { _id: '', name: '', lastname: '', email: '', phone: '', address: ''},
  errorMessage: null,
  successMessage: null,
  errorSystem: null,
};

export const initialStatePatientContext = {
  isLoadingPatients: false,
  isLoadingAction: false,
  patients: [],
  activePatient: null,
  isSavedPatient: 'notSaved',
}