import instance from '@/config/api.js'

class API {
  async getLists() {
    const c = await instance.get('getLists', {})
    return c.data
  }

  async getTools(region, jobBoard, dateId) {
    const tools = await instance.get('getTools', {
      params: { region, jobBoard, dateId },
    })
    return tools.data
  }

  async getCategories() {
    const categories = await instance.get('getCategories')
    return categories.data
  }

  async getDates(id_date) {
    const dates = await instance.get('getDates', { params: { id_date } })
    return dates.data
  }

  async getCountOfCurrentItem(idTool) {
    const dates = await instance.get('getCountOfCurrentItem', {
      params: { idTool },
    })
    return dates.data
  }
}

export default new API()
