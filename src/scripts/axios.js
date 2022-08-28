import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5501/',
  timeout: 0,
  // withCredentials: true,
})

const getTools = () => instance.get('getTools').then(t => t.data)
const getCategories = () => instance.get('getCategories').then(c => c.data)
const getDates = () => instance.get('getDates').then(r => r.data)

export { getTools, getCategories, getDates }
