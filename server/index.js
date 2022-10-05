const express = require('express')
const needle = require('needle')
const cors = require('cors')
const Pool = require('pg').Pool
const axios = require('axios')
const app = express()
app.use(cors())
let isGettingDataOfCount = false
require('dotenv').config()

const p = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
})

app.get('/getDates', async (req, res) => {
  return p.query('SELECT * FROM date_of_completion', async (e, results) => {
    try {
      res.json(!isGettingDataOfCount ? results.rows : results.rows.slice(0, -1))
    } catch (error) {
      console.log(`JS ERROR:${error}`)
      if (e) console.log(`DATABASE ERROR: ${e}`)
    }
  })
})

app.get('/getTools', async (req, res) => {
  const region = req.query.region
  const jobBoard = req.query.jobBoard
  p.query('SELECT * FROM categories', (e, results) => {
    const categories = results.rows
    p.query('SELECT * FROM tools', async (e, results) => {
      let tools = results.rows
      p.query(
        `SELECT * FROM _counts WHERE region = '${region}' AND job_board = '${jobBoard}'`,
        (e, results) => {
          let toolsInCounts = results.rows
          for (let i = 0; i < tools.length; i++) {
            for (let j = 0; j < toolsInCounts.length; j++) {
              if (tools[i].id_tool == toolsInCounts[j].id_tool) {
                if (!tools[i].counts) tools[i].counts = { [jobBoard]: {} }
                tools[i].counts[jobBoard][toolsInCounts[j].date_of_completion] =
                  toolsInCounts[j]._count
              }
            }
          }

          tools = tools.map(tool => {
            const category = categories.find(
              category => category.id_category === tool.id_category
            )
            delete tool.id_category
            return { ...tool, category }
          })
          res.status(200).json(tools)

          // p.query('SELECT * FROM date_of_completion', async (e, results) => {
          //   const dates = isGettingDataOfCount ? results.rows.slice(0, -1) : results.rows

          //   await p.query(
          //     `SELECT * FROM date_of_completion ORDER BY id_date DESC LIMIT 1`,
          //     (e, results) => {
          //       if (isGettingDataOfCount) {
          //         counts = counts.filter(
          //           t => t.date_of_completion !== results.rows[0].id_date
          //         )
          //         console.log('2', counts.length)
          //       }
          //       console.log('3', counts.length)
          //       tools = tools.map(tool => ({ ...tool, counts: {} }))
          //       dates.map(date => {
          //         tools = tools.map(tool => {
          //           const count = counts.filter(
          //             count =>
          //               count.id_tool === tool.id_tool &&
          //               date.id_date === count.date_of_completion
          //           )
          //           const [countIndeed, countHeadHunter] = [
          //             count[0]._count,
          //             count[1]._count,
          //           ]
          //           tool.counts[date.id_date] = {
          //             countHeadHunter,
          //             countIndeed,
          //           }
          //           return { ...tool }
          //         })
          //       })

          //       res.status(200).json(tools)
          //     }
          //   )

          //   res.status(200).json(tools)
          // })
        }
      )
    })
  })
})

app.get('/getCategories', (req, res) => {
  p.query('SELECT * FROM categories', (e, results) => {
    try {
      res.json(results.rows)
    } catch (error) {
      console.log('JS ERROR:', error)
      if (e) console.log(`DATABASE ERROR: ${e}`)
    }
  })
})

async function getDataNumberOfVacancies() {
  console.log('Start getDataNumberOfVacancies')
  const start = new Date()
  isGettingDataOfCount = true

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear()).padStart(2, '0')
  const date = `${year}-${month}-${day}`

  p.query(
    `SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1`,
    (e, results) => {
      p.query(
        `INSERT INTO date_of_completion(date_of_completion) VALUES('${date}')`
      )
      const lastDateId = results.rows[0].id_date + 1
      p.query('SELECT * FROM tools', async (e, results) => {
        let tools = results.rows
        for (const tool of tools) {
          const findTool = encodeURIComponent(tool.name_tool)
          const countVacancy = await axios({
            method: 'get',
            url: `https://api.hh.ru/vacancies?area=1&no_magic=true&page=0&per_page=0&area=113&text=${findTool}`,
          })
          p.query(
            `INSERT INTO _counts(region,job_board,id_tool,date_of_completion,_count) VALUES('Russia','HeadHunter',${tool.id_tool},${lastDateId},${countVacancy.data.found})`
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

app.get('/getDataNumberOfVacancies', (req, res) => {
  res.send('...')
  getDataNumberOfVacancies()
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('SERVER WORKING!', port)
})
