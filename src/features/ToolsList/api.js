import instance from '@/config/api.js'

class API {
  async getLists() {
    const c = await instance.get('getLists', {})
    return c.data
  }

  async getTools(region, jobBoard) {
    const tools = await instance.get('getTools', {
      params: { region, jobBoard },
    })
    return tools.data
  }

  async getCategories() {
    const categories = await instance.get('getCategories')
    return categories.data
  }

  async getDates() {
    const dates = await instance.get('getDates')
    return dates.data
  }
}

export default new API()
