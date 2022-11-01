import axios from 'axios'
const url = require('!/server/helpers/getURL')

const instance = axios.create({
  baseURL: url.server,
  timeout: 0,
  withCredentials: true,
  headers: {},
})

class API {
  getTools = async (region, jobBoard) => {
    const tools = await instance.get('getTools', {
      params: { region, jobBoard },
    })
    return tools.data
  }

  getCategories = async () => {
    const categories = await instance.get('getCategories')
    return categories.data
  }

  getDates = async () => {
    const dates = await instance.get('getDates')
    return dates.data
  }

  registrationUser = async (email, password) => {
    const user = await instance.post('registrationUser', {
      email,
      password,
    })
    return user.data
  }

  loginUser = async (email, password) => {
    const user = await instance.post('loginUser', { email, password })
    return user.data
  }

  logoutUser = async () => {
    await instance.post('logout')
  }

  refreshToken = async refreshToken => {
    const token = await instance.post('refreshToken', {
      params: { refreshToken },
    })
    return token.data
  }
}

export default new API()
