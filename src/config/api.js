import axios from 'axios'
import { SERVER_LOCAL, isProduction } from '@/shared/consts.js'

const server = isProduction ? process.env.SERVER_ADDRESS : SERVER_LOCAL

const instance = axios.create({
  baseURL: server,
  headers: {},
  timeout: 0,
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default instance
