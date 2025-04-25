import { IPatient, IResponsePatient } from '../../domain'

const formatFechaLarga = (fechaStr?: Date): string => {
  const fecha = fechaStr ? new Date(fechaStr) : new Date()
  return fecha
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    .replace('de ', 'de ')
    .replace(' del ', ' del ')
}

const requestGetList = (data: IResponsePatient[]): IPatient[] => {
  return data.map((item) => ({
    id: item._id,
    pet_name: item.name,
    owner: item.owner,
    email: item.email,
    symptoms: item.symptoms,
    created_date: formatFechaLarga(item.visitDate)
  }))
}

export const homeMappers = {
  requestGetList
}
