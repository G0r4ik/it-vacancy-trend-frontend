require('dotenv').config()
const chalk = require('chalk')
const isGettingDataOfCount = require('./helpers/isGettingDataOfCount')
const getDataNumberOfVacancies = require('./getDataNumberOfVacancies')
const userService = require('./services/userServices')
const url = require('./helpers/getURL')
const queries = require('./sql-query')

class Controllers {
  // async createList(req, res) {}

  async getLists(req, res) {
    // const { date } = req.query
    const lists = await userService.getLists()
    res.json(lists)
  }

  async getDataNumberOfVacancies(req, res) {
    res.end()
    getDataNumberOfVacancies()
  }

  async getCategories(req, res) {
    res.json(await queries.getCategories())
  }

  async getDates(req, res) {
    const dates = await queries.getDates()
    res.json(isGettingDataOfCount.status ? dates.slice(0, -1) : dates)
  }

  async getTools(req, res) {
    const { region, jobBoard } = req.query
    const categories = await queries.getCategories()
    let tools = await queries.getTools()
    const toolsInCounts = await queries.getCounts(region, jobBoard)

    for (const tool of tools) {
      for (const toolsInCount of toolsInCounts) {
        if (tool.toolId === toolsInCount.toolId) {
          if (!tool.counts) tool.counts = { [jobBoard]: {} }
          tool.counts[jobBoard][toolsInCount.date_of_completion] =
            toolsInCount.count
        }
      }
    }

    tools = tools.map(tool => {
      const category = categories.find(
        category2 => category2.id_category === tool.id_category
      )
      delete tool.id_category
      return { ...tool, category }
    })
    res.status(200).json(tools)
  }

  async activateAccount(req, res) {
    try {
      const { link } = req.query
      await userService.activate(link)
      res.redirect(url.client)
    } catch (error) {
      console.log(chalk.red(error))
    }
  }

  async registrationUser(req, res) {
    try {
      const { email, password } = req.body

      const userData = await userService.registrationUser(email, password)

      const MAX_AGE_COOKIE = 30 * 24 * 60 * 60 * 1000 // 30d
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: MAX_AGE_COOKIE,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (error) {
      res.send({ error: error.message })
    }
  }

  async loginUser(req, res) {
    try {
      // const { refreshToken } = req.cookies
      // console.log(req.cookies)
      const { email, password } = req.body
      const userData = await userService.login(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })

      return res.json(userData)
    } catch (error) {
      console.log(chalk.red(error))
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
    } catch (error) {
      console.log(chalk.red(error))
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refreshToken(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      console.log(chalk.red(error))
    }
  }
}

module.exports = new Controllers()
