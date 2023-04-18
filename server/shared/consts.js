const isProduction = process.env.NODE_ENV === 'production'
const CLIENT_LOCAL = `http://localhost:${process.env.LOCAL_WEBPACK_PORT}`
const SERVER_LOCAL = `http://localhost:${process.env.LOCAL_SERVER_PORT}`
const client = isProduction ? process.env.CLIENT_ADDRESS : CLIENT_LOCAL
const server = isProduction ? process.env.SERVER_ADDRESS : SERVER_LOCAL

const PORT = process.env.PORT || process.env.LOCAL_SERVER_PORT
const INTERVAL_OF_GET_VACANCEIS = 24 * 60 * 60 * 1000 // 1 day

module.exports = { server, client, PORT, INTERVAL_OF_GET_VACANCEIS }
