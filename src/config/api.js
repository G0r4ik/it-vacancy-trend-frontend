import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
const isProduction = process.env.NODE_ENV === 'production'
console.log(process.env.NODE_ENV, process.env.LOCAL_SERVER_PORT, process.env)
const SERVER_LOCAL = `http://localhost:${process.env.LOCAL_SERVER_PORT}`
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