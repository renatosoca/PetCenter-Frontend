import axios from 'axios';

const petCenterApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/api`
});

petCenterApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${ localStorage.getItem('petToken') || '' }`
  }
  return config;
});

export default petCenterApi;