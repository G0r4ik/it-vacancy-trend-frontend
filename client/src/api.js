import axios from 'axios'
const url = process.env.SERVER_ADDRESS
const instance = axios.create({
  baseURL: url
  timeout: 0,
  // withCredentials: true,
})

const getTools = (region, jobBoard) =>
  instance.get('getTools', { params: { region, jobBoard } }).then(t => t.data)
const getCategories = () => instance.get('getCategories').then(c => c.data)
const getDates = () => instance.get('getDates').then(r => r.data)

export { getTools, getCategories, getDates }
