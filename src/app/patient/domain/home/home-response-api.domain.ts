export interface IResponseGetListApi<T> {
  ok: boolean
  page: number
  rowPerPage: number
  totalCount: number
  patients: T[]
}

export interface IResponsePatient {
  _id: string
  name: string
  owner: string
  email: string
  visitDate: Date
  symptoms: string
  createdFor: CreatedFor
  __v: number
}

export interface CreatedFor {
  _id: string
  name: string
  lastname: string
  email: string
}
