const isProduction = process.env.NODE_ENV === 'production'
const CLIENT_LOCAL = `http://localhost:${process.env.LOCAL_WEBPACK_PORT}`
const SERVER_LOCAL = `http://localhost:${process.env.LOCAL_SERVER_PORT}`
const client = isProduction ? process.env.CLIENT_ADDRESS : CLIENT_LOCAL
const server = isProduction ? process.env.SERVER_ADDRESS : SERVER_LOCAL

module.exports = { server, client }
