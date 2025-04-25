import { petCenterApi } from '@/app.globals'
import { ErrorHandler } from '@/shared/utils'
import { IPatient, IResponseGetListApi, IResponsePatient } from '../../domain'
import { homeMappers } from '../../mappers'

interface paramsWithPaginate {
  page: number
  limit: number
}

interface IGetListReturn<T> {
  data: T[]
  totalCount: number
}

const getList = async (params: paramsWithPaginate): Promise<IGetListReturn<IPatient>> => {
  try {
    const { data } = await petCenterApi.get<IResponseGetListApi<IResponsePatient>>('/patient', { params })

    const list = homeMappers.requestGetList(data.patients)

    return {
      data: list,
      totalCount: data.totalCount
    }
  } catch (error) {
    throw ErrorHandler.fromAxiosError<string>({ error, title: 'Get List Error' })
  }
}

export const HomeServices = {
  getList
}
