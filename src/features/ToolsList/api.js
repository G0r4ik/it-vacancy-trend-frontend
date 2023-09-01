import instance from '@/config/api.js'

class API {
  async getLists() {
    const c = await instance.get('getLists', {})
    return c.data
  }

  async getTools(idDate, idJobBoardsRegions) {
    const tools = await instance.get('getTools', {
      params: { idJobBoardsRegions, idDate },
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

  async getCountOfCurrentItem(idTool, idJobBoardsRegions, signal) {
    try {
      const dates = await instance.get('getCountOfCurrentItem', {
        signal,
        params: { idTool, idJobBoardsRegions },
      })
      return dates.data
    } catch (error) {
      console.log(error)
    }
  }

  async getJobBoardsRegions() {
    try {
      const response = await instance.get('getJobBoardsRegions')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getLastCountOfAllItems(idDate, idJobBoardsRegions) {
    try {
      const response = await instance.get('getCountOfCurrentDate', {
        params: { idDate, idJobBoardsRegions },
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default new API()
