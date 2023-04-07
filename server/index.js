require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const getDataNumberOfVacancies = require('./getDataNumberOfVacancies')
const url = require('./helpers/getURL')

const port = process.env.PORT || process.env.LOCAL_SERVER_PORT
const INTERVAL_OF_GET_VACANCEIS = 24 * 60 * 60 * 1000 // 1 day

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: [url.client] }))
app.use(require('./router'))

app.listen(port, () => {
  console.log(`SERVER WORKING. PORT: ${port}`)
})

setInterval(() => {
  getDataNumberOfVacancies()
}, INTERVAL_OF_GET_VACANCEIS)
