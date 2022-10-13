let isGettingDataOfCount = false
const p = require('./db')
const userService = require('./services/userServices')
const url = require('./helpers/getURL')
require('dotenv').config()

class Controllers {
  getCategories(req, res) {
    p.query('SELECT * FROM categories', (e, results) => {
      try {
        res.json(results.rows)
      } catch (error) {
        console.log('JS ERROR:', error)
        if (e) console.log(`DATABASE ERROR: ${e}`)
      }
    })
  }

  getDates(req, res) {
    return p.query('SELECT * FROM date_of_completion', async (e, results) => {
      try {
        res.json(
          !isGettingDataOfCount ? results.rows : results.rows.slice(0, -1)
        )
      } catch (error) {
        console.log(`JS ERROR:${error}`)
        if (e) console.log(`DATABASE ERROR: ${e}`)
      }
    })
  }

  getTools(req, res) {
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
                if (tools[i].id_tool === toolsInCounts[j].id_tool) {
                  if (!tools[i].counts) tools[i].counts = { [jobBoard]: {} }
                  tools[i].counts[jobBoard][
                    toolsInCounts[j].date_of_completion
                  ] = toolsInCounts[j]._count
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
  }

  activate(req, res) {
    const { link: activationLink, user: userLogin } = req.query
    const result = userService.activate(activationLink, userLogin)
    if (result) return res.send('Что-то пошло не так')
    res.redirect(url.client)
    // return res.send('УСПЕХ')
  }

  async registrationUser(req, res) {
    const { login, password, email } = req.body
    if (await userService.hasUserLoginInDB(login)) {
      console.log('Уже существует пользователь с таким логином')
      return res.send('Уже существует пользователь с таким логином')
    }
    if (await userService.hasUserMailInDB(email)) {
      console.log('Уже существует пользователь с такой почтой')
      return res.send('Уже существует пользователь с такой почтой')
    }

    const tokens = userService.generateToken({ login, email })
    userService.registrationUser(tokens, login, password, email)
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    return res.send('ok')
  }

  async loginUser(req, res) {
    console.log('Процесс входа')
    const { refreshToken } = req.cookies
    console.log(req.cookies)
    const { email, login, password } = req.body
    const tokens = userService.generateToken({ login, email })
    const userData = await userService.login(login, password, email)
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    console.log('Попытка входа')
    res.send(userData)
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies
    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    res.send('Вы успешно вышли из аккаунта')
  }
}

module.exports = new Controllers()
