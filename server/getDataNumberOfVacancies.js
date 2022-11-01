const needle = require('needle')
const isGettingDataOfCount = require('./helpers/isGettingDataOfCount')
const currentDate = require('./helpers/getCurrentDate')
const queries = require('./sql-query')

async function getCountInPage(tool) {
  const findTool = encodeURIComponent(tool.name_tool)
  const url = `https://hh.ru/search/vacancy?no_magic=true&area=113&&items_on_page=1&text=${findTool}`
  let resp = await needle('get', url)

  const indexOfStart = resp.body.indexOf('bloko-header-3')
  const findString = resp.body.slice(indexOfStart + 45, indexOfStart + 300)
  console.log(findString)
  let countVacancy = ''
  if (
    findString.includes('исправлен') ||
    findString.includes('ничего не найдено')
  ) {
    return 0
  }

  const n = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  for (let i = 0; i < findString.length; i++) {
    if (n.includes(findString[i])) countVacancy += findString[i]
    if (findString[i] === 'в') return +countVacancy
  }
}

module.exports = async function getDataNumberOfVacancies() {
  console.log('Start getDataNumberOfVacancies')
  const start = new Date()
  isGettingDataOfCount.changeStatus(true)

  await queries.createNewDate(currentDate())
  let lastDateId = await queries.getLastDate()
  lastDateId = lastDateId[0].id_date
  let tools = await queries.getTools()

  for (const tool of tools) {
    const countVacancy = await getCountInPage(tool)
    console.log(tool.name_tool, countVacancy)
    await queries.setCountsItem(tool.id_tool, lastDateId, countVacancy)
  }

  isGettingDataOfCount.changeStatus(false)
  console.log(`Потрачено минут: ${((new Date() - start) / 60000).toFixed(2)}`)
}

// const countVacancy = await axios({
//   method: 'get',
//   url: `https://api.hh.ru/vacancies?area=1&no_magic=true&page=0&per_page=0&area=113&text=${findTool}`,
// })

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
