require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { getDataNumberOfVacancies } = require('./components/list/index')
const { client, PORT, INTERVAL_OF_GET_VACANCEIS } = require('./shared/consts')
const routes = require('./config/router')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: [client] }))

for (const router of Object.values(routes)) app.use(router)

app.listen(PORT, () => {
  console.log(`SERVER WORKING. PORT: ${PORT}`)
})
setInterval(() => {
  getDataNumberOfVacancies()
}, INTERVAL_OF_GET_VACANCEIS)
// getDataNumberOfVacancies() // for test
