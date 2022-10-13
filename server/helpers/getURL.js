const client =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ADDRESS
    : `http://localhost:${process.env.WEBPACK_PORT}`

const server =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_ADDRESS
    : 'http://localhost:5000'

module.exports = { server, client }
