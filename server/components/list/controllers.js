require('dotenv').config()
const isGettingDataOfCount = require('./helprers')
const getDataNumberOfVacancies = require('./getDataNumberOfVacancies')
// const userService = require('./co')
const queries = require('./sql')

class Controllers {
  // async createList(req, res) {}

  async getLists(req, res) {
    // const { date } = req.query
    // const lists = await userService.getLists()
    // res.json(lists)
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

    console.log(tools.at(-1)) // { id_tool: 1, name_tool: '1c', id_category: 13 }
    console.log(toolsInCounts.at(-1))

    for (const tool of tools) {
      for (const toolsInCount of toolsInCounts) {
        if (tool.id_tool === toolsInCount.id_tool) {
          if (!tool.counts) tool.counts = { [jobBoard]: {} }
          tool.counts[jobBoard][toolsInCount.date_of_completion] =
            toolsInCount._count
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
}

module.exports = new Controllers()
