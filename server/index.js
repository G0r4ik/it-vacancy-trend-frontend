const express = require('express')
const needle = require('needle')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const p = require('./db')
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:9000',
  })
)
// app.use(require('cors')())
app.use(require('./router'))
require('dotenv').config()
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log('SERVER WORKING!', port)
})

async function getDataNumberOfVacancies() {
  console.log('Start getDataNumberOfVacancies')
  const start = new Date()
  isGettingDataOfCount = true

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).padStart(2, '0')
  p.query(
    `INSERT INTO date_of_completion(date_of_completion) VALUES('${year}-${month}-${day}')`,
    (e, results) => {
      p.query(
        `SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1`,
        (e, results) => {
          const lastDateId = results.rows[0].id_date
          console.log(lastDateId)
          p.query('SELECT * FROM tools', async (e, results) => {
            let tools = results.rows
            for (const tool of tools) {
              const findTool = encodeURIComponent(tool.name_tool)
              // const countVacancy = await axios({
              //   method: 'get',
              //   url: `https://api.hh.ru/vacancies?area=1&no_magic=true&page=0&per_page=0&area=113&text=${findTool}`,
              // })

              const url = `https://hh.ru/search/vacancy?no_magic=true&area=113&&items_on_page=1&text=${findTool}`
              let resp = await needle('get', url)
              const find = resp.body.slice(40000).indexOf('bloko-header-3')
              const a = resp.body.slice(40000 + find, 40000 + find + 275)
              console.log(tool)
              console.log(a)
              let countVacancy = ''
              if (a.includes('исправлен') || a.includes('ничего не найдено')) {
                countVacancy = 0
              } else {
                const n = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
                for (let i = 45; i < a.length; i++) {
                  if (a[i] === 'в') break
                  if (a[i] === ' ') continue
                  if (n.includes(a[i])) {
                    countVacancy += a[i]
                  }
                }
              }
              countVacancy = +countVacancy
              p.query(
                `INSERT INTO _counts(region,job_board,id_tool,date_of_completion,_count) VALUES('Russia','HeadHunter',${tool.id_tool},${lastDateId},${countVacancy})`
              )
            }

            // let countOfError = 0
            // let countError = {}

            // async function getCount(tool) {
            //   if (countOfError > 10)
            //     return p.query(
            //       `INSERT INTO _counts(
            //     job_board,
            //     region,
            //     id_tool,
            //     date_of_completion,
            //     _count)
            //     VALUES(
            //       'Indeed',
            //       'Global',
            //     ${tool.id_tool},
            //     (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
            //     0
            //     )`
            //     )
            //   // console.log(2)

            //   try {
            //     const encodeString = encodeURIComponent(tool.name_tool)
            //     const url =
            //       encodeString === tool.name_tool
            //         ? `https://www.indeed.com/q-${tool.name_tool}-jobs.html`
            //         : `https://www.indeed.com/jobs?q=${encodeString}&vj&vjk`

            //     let resp = await needle('get', url)
            //     const fs = require('fs')
            //     fs.writeFileSync('./test-sync', Object.keys(resp).join(', '))
            //     setTimeout(async () => {
            //       let indexFirstDigit = resp.body.indexOf('Page 1 o') + 10
            //       // console.log(resp.body)
            //       if (indexFirstDigit === 9) {
            //         console.log('nope')
            //         countOfError++
            //         countError[tool.name_tool] = countError
            //         return getCount(tool)
            //       }
            //       console.log('yes')

            //       let number = resp.body.slice(indexFirstDigit, indexFirstDigit + 10)
            //       let result2 = ''
            //       for (const char of number) {
            //         if (char === ' ') {
            //           return p.query(
            //             `INSERT INTO _counts(
            //               job_board,
            //               region,
            //           id_tool,
            //           date_of_completion,
            //           _count)
            //           VALUES(
            //             'Indeed',
            //             'Global',
            //           ${tool.id_tool},
            //           (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
            //           ${result2})`
            //           )
            //         }
            //         if (char === ',') continue
            //         result2 += char
            //       }
            //     }, 500)
            //     // console.log(3)
            //   } catch (error) {
            //     console.log('Произошла ошибка', tool)
            //     console.log(error)
            //     return getCount(tool)
            //   }
            // }

            // for (let i = 0; i < tools.length; i++) {
            //   console.log(1)
            //   countOfError = 0
            //   await getCount(tools[i])
            //   console.log(tools[i].name_tool, 'found')
            // }
            isGettingDataOfCount = false
            console.log(
              `Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`
            )
          })
        }
      )
    }
  )
}

// Для тестирования
app.get('/getDataNumberOfVacancies', (req, res) => {
  res.end()
  getDataNumberOfVacancies()
})

// setInterval(() => {
//   getDataNumberOfVacancies()
// }, 60000)
