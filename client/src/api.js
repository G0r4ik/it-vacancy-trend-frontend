import axios from 'axios'
const url = require('!/server/helpers/getURL')

const instance = axios.create({
  baseURL: url.server,
  timeout: 0,
  withCredentials: true,
  headers: {},
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

class API {
  async getLists() {
    const c = await instance.get('getLists', {})
    return c.data
  }

  async getTools(region, jobBoard) {
    const tools = await instance.get('getTools', {
      params: { region, jobBoard },
    })
    return tools.data
  }

  async getCategories() {
    const categories = await instance.get('getCategories')
    return categories.data
  }

  async getDates() {
    const dates = await instance.get('getDates')
    return dates.data
  }

  async registrationUser(email, password) {
    const user = await instance.post('registrationUser', {
      email,
      password,
    })
    return user.data
  }

  async loginUser(email, password) {
    const user = await instance.post('loginUser', { email, password })
    return user.data
  }

  async logoutUser() {
    await instance.post('logout')
  }

  async refreshToken(refreshToken) {
    const token = await instance.post('refreshToken', {
      params: { refreshToken },
    })
    return token.data
  }
}

export default new API()
