const express = require('express')
const needle = require('needle')
const cors = require('cors')
const Pool = require('pg').Pool
const axios = require('axios')
const app = express()
app.use(cors())
let isGetCount = false

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'vacna',
  password: 'zxczxc2013',
  port: 5432,
})

app.get('/getDates', (req, res) => {
  pool.query('SELECT * FROM date_of_completion', (e, results) => {
    res.send(!isGetCount ? results.rows : results.rows.slice(0, -1))
  })
})

app.get('/getIndeed', async (req, res) => {
  pool.query('SELECT * FROM _counts;', async (error, results) => {
    let counts = results.rows

    counts = counts.map(({ id_tool, date_of_completion, _count }) => {
      return { id_tool, count: [[date_of_completion], _count] }
    })

    res.status(200).json(counts)

    // [{"id_tool":1,"count":{"99":336}},{"id_tool":2,"count":{"99":165063}}]
  })
})

app.get('/getTools', async (req, res) => {
  pool.query('SELECT * FROM categories', (e, result) => {
    if (e) return console.log(err)

    const categories = result.rows
    pool.query('SELECT * FROM tools', (e, result) => {
      let tools = result.rows
      tools = tools.map(tool => {
        const category = categories.find(
          category => category.id_category === tool.id_category
        )
        delete tool.id_category
        return { ...tool, category, counts: {} }
      })

      pool.query('SELECT * FROM date_of_completion', (e, results) => {
        const dates = isGetCount ? results.rows.slice(0, -1) : results.rows

        // await pool.query(
        //   `SELECT * FROM date_of_completion ORDER BY id_date DESC LIMIT 1`,
        //   (e, results) => {
        //     if (isGetCount) {
        //       counts = counts.filter(
        //         t => t.date_of_completion !== results.rows[0].id_date
        //       )
        //       console.log('2', counts.length)
        //     }
        //     console.log('3', counts.length)
        //     tools = tools.map(tool => ({ ...tool, counts: {} }))
        //     dates.map(date => {
        //       tools = tools.map(tool => {
        //         const count = counts.filter(
        //           count =>
        //             count.id_tool === tool.id_tool &&
        //             date.id_date === count.date_of_completion
        //         )
        //         const [countIndeed, countHeadHunter] = [
        //           count[0]._count,
        //           count[1]._count,
        //         ]
        //         tool.counts[date.id_date] = {
        //           countHeadHunter,
        //           countIndeed,
        //         }
        //         return { ...tool }
        //       })
        //     })

        //     res.status(200).json(tools)
        //   }
        // )

        res.status(200).json(tools)
      })
    })
  })
})

app.get('/getCategories', (req, res) => {
  pool.query('SELECT * FROM categories', (error, results) => {
    res.status(200).json(results.rows)
  })
})

async function uploadDataToTheDatabase() {
  const start = new Date()
  isGetCount = true

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth()).padStart(2, '0')
  const year = String(now.getFullYear()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const date = `${day}.${month}.${year} ${hours}:${minutes}`

  await pool.query(
    `INSERT INTO date_of_completion(date_of_completion) VALUES('${date}')`
  )
  await pool.query('SELECT * FROM tools', async (e, result) => {
    let tools = result.rows

    // for (let i = 0; i < tools.length; i++) {
    //   const result = await axios({
    //     method: 'get',
    //     url: `https://api.hh.ru/vacancies?text=${encodeURIComponent(
    //       tools[i].name_tool
    //     )}&area=1&no_magic=true&page=0&per_page=0&area=113`,
    //   })
    //   pool.query(
    //     `INSERT INTO _counts(
    //     job_board,
    //     region,
    //     id_tool,
    //     date_of_completion,
    //     _count,
    //     )
    //     VALUES(
    //       'HeadHunter',
    //       'Russia',
    //     ${tools[i].id_tool},
    //     (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
    //     ${result.data.found}
    //     )`
    //   )
    // }

    let countOfError = 0
    let countError = {}

    async function getCount(tool) {
      if (countOfError > 10)
        return pool.query(
          `INSERT INTO _counts(
        job_board,
        region,
        id_tool,
        date_of_completion,
        _count)
        VALUES(
          'Indeed',
          'Global',
        ${tool.id_tool},
        (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
        0
        )`
        )
      // console.log(2)

      try {
        const encodeString = encodeURIComponent(tool.name_tool)
        const url =
          encodeString === tool.name_tool
            ? `https://www.indeed.com/q-${tool.name_tool}-jobs.html`
            : `https://www.indeed.com/jobs?q=${encodeString}&vj&vjk`

        let resp = await needle('get', url)
        const fs = require('fs')
        fs.writeFileSync('./test-sync', Object.keys(resp).join(', '))
        setTimeout(async () => {
          let indexFirstDigit = resp.body.indexOf('Page 1 o') + 10
          // console.log(resp.body)
          if (indexFirstDigit === 9) {
            console.log('nope')
            countOfError++
            countError[tool.name_tool] = countError
            return getCount(tool)
          }
          console.log('yes')

          let number = resp.body.slice(indexFirstDigit, indexFirstDigit + 10)
          let result = ''
          for (const char of number) {
            if (char === ' ') {
              return pool.query(
                `INSERT INTO _counts(
                  job_board,
                  region,
              id_tool,
              date_of_completion,
              _count)
              VALUES(
                'Indeed',
                'Global',
              ${tool.id_tool},
              (SELECT id_date FROM date_of_completion ORDER BY id_date DESC LIMIT 1),
              ${result})`
              )
            }
            if (char === ',') continue
            result += char
          }
        }, 500)
        // console.log(3)
      } catch (error) {
        console.log('Произошла ошибка', tool)
        console.log(error)
        return getCount(tool)
      }
    }

    for (let i = 0; i < tools.length; i++) {
      console.log(1)
      countOfError = 0
      await getCount(tools[i])
      console.log(tools[i].name_tool, 'found')
    }
    isGetCount = false
    console.log(`Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`)
  })
}

app.get('/uploadDataToTheDatabase', (req, res) => uploadDataToTheDatabase())

const port = 5501
app.listen(port, () => {
  console.log('SERVER WORKING!', port)
})
