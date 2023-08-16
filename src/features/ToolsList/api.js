import instance from '@/config/api.js'

class API {
  async getLists() {
    const c = await instance.get('getLists', {})
    return c.data
  }

  async getTools(dateId, jobBoardRegion = 1) {
    const tools = await instance.get('getTools', {
      params: { jobBoardRegion, dateId },
    })
    return tools.data
  }

  // FIXME
  async getOnlyTools() {
    const tools = await instance.get('getOnlyTools')
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

  async getCountOfCurrentItem(idTool, signal) {
    try {
      const dates = await instance.get('getCountOfCurrentItem', {
        signal,
        // FIX тут хардкод!
        params: { idTool, jobBoard: '1', region: '1' },
      })
      return dates.data
    } catch {}
  }

  async getEvents(idTool, region = 1, jobBoard = 1) {
    try {
      const events = await instance.get('getEventsOfCurrentItem', {
        params: { idTool, region, jobBoard },
      })
      return events.data
    } catch (error) {
      console.log(error)
    }
  }

  async setCategory(idTool, idCategory) {
    await instance.get('aaaa2', {
      params: { idTool, idCategory },
    })
  }
}

export default new API()
