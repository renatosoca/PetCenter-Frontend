import { meta } from './meta'
import { fetchApi } from './shared/fetch-api'

export const apiBaseUrl = meta.env.VITE_APP_API_URL

export const petCenterApi = new fetchApi()
