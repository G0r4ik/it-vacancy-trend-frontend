import axios from 'axios'

const url = require('@server/shared/consts')

const instance = axios.create({
  baseURL: url.server,
  headers: {},
  timeout: 0,
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default instance
