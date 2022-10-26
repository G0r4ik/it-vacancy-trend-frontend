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

  registrationUser = async (login, password, email) => {
    const user = await instance.post('registrationUser', {
      login,
      password,
      email,
    })
    return user.data
  }

  loginUser = async (login, password, email) => {
    const user = await instance.post('loginUser', { login, password, email })
    return user.data
  }

  logoutUser = async () => {
    await instance.post('logout')
  }
}

export default new API()
