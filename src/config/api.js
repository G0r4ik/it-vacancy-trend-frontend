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

instance.interceptors.response.use(
  config => config,
  async error => {
    try {
      const originalRequest = error.config
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true
        const token1 = await instance.get('refresh_token')
        const token = token1.data.accessToken
        localStorage.setItem('token', token)
        return instance.request(originalRequest)
      }
      throw error
    } catch (error_) {
      throw error_
      // throw error2
    }
  }
)

export default instance
