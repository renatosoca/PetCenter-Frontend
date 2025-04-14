export const initialFormUserProfile = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
};
export const validationsFormUserProfile = {
  name: [(value) => value?.length > 0, "El nombre es obligatorio"],
  lastname: [(value) => value?.length > 0, "El apellido es obligatorio"],
  email: [(value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value), "Tiene que ser un email válido."],
};

export const initalFormUserNewPass = {
  oldPassword: "",
  newPassword: "",
};
export const validationsFormUserNewPass = {
  oldPassword: [(oldPassword) => oldPassword?.length > 0, "La contraseña actual es requerida"],
  newPassword: [(newPassword) => newPassword?.length > 7, "La nueva contraseña tiene que tener un mínimo de 8 caracteres"],
};

export const initialFormLogin = {
  email: "",
  password: "",
};
export const valitadionsFormLogin = {
  email: [(email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), "Tiene que ser un email válido."],
  password: [(password) => password?.length > 7, "La contraseña debe contener un mínimo de 8 caracteres."],
};

export const initialFormForgotPass = {
  email: "",
};
export const valitadionsFormForgotPass = {
  email: [(email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), "Tiene que ser un email válido."],
};

export const initialFormRegister = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
};
export const valitadionsFormRegister = {
  name: [(name) => name?.length > 0, "El nombre es obligatorio."],
  lastname: [(lastname) => lastname?.length > 0, "El apellido es obligatorio."],
  email: [(email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), "Tiene que ser un email válido."],
  phone: [(phone) => phone?.length > 8, "La telefono debe contener un mínimo de 9 caracteres."],
  password: [(password) => password?.length > 7, "La contraseña debe contener un mínimo de 8 caracteres."],
  repeatPassword: [(repeatPassword, password) => repeatPassword !== password > 7, "Las contraseñas no coinciden."],
};

export const initialFormResetPass = {
  password: "",
  repeatPassword: "",
};
export const valitadionsFormResetPass = {
  password: [(value) => value?.length > 7, "La contraseña debe contener un mínimo de 8 caracteres."],
  repeatPassword: [(value, password) => value === password, "Las contraseñas no coinciden"],
};

export const initialFormModalPatient = {
  name: "",
  owner: "",
  email: "",
  visitDate: "",
  symptoms: "",
};
export const validationsFormModalPatient = {
  name: [(name) => name?.length > 0, "El nombre es obligatorio"],
  owner: [(value) => value?.length > 0, "El propietario es obligatorio"],
  email: [(email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), "Tiene que ser un email válido."],
  visitDate: [(value) => value?.length > 0, "La fecha es obligatoria"],
  symptoms: [(value) => value?.length > 0, "Los síntomas son obligatorios"],
};
