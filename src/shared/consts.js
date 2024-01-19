const LOCAL_SERVER_PORT = 5000
export const SERVER_LOCAL = `http://localhost:${LOCAL_SERVER_PORT}`
export const SERVER_PROD = `https://itvacna.online`
export const SERVER_API_PROD = `https://api.itvacna.online`
export const isProduction = process.env.NODE_ENV === 'production'

export const colors = [
  '#ad1457',
  '#009688',
  '#8bc34a',
  '#1565c0',
  '#f44336',
  '#448aff',
  '#ffc107',
  '#219ebc',
  '#ff9800',
  '#023047',
  '#8ecae6',
]
