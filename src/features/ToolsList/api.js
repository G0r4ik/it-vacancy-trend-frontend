import instance from '@/config/api.js'
import { useSharedStore } from '@/shared/store.js'

class API {
  async getLists() {
    try {
      const c = await instance.get('getLists', {})
      return c.data
    } catch (error) {
      useSharedStore().errorHandler(error, `url "/getTools" does not work`)
      return 'wtf'
    }
  }

  async getTools() {
    try {
      const tools = await instance.get('getTools')
      return tools.data
    } catch (error) {
      useSharedStore().errorHandler(error, 'url /getTools does not work')
      return []
    }
  }

  async getCategories() {
    try {
      const categories = await instance.get('getCategories')
      return categories.data
    } catch (error) {
      useSharedStore().errorHandler(error, 'url /getCategories does not work')
      return []
    }
  }

  async getDates() {
    try {
      const dates = await instance.get('getDates')
      return dates.data
    } catch (error) {
      useSharedStore().errorHandler(error, 'url /getDates does not work')
      return []
    }
  }

  async getCountOfCurrentItem(idTool, idJobBoardRegion, signal) {
    try {
      const dates = await instance.get('getCountOfCurrentItem', {
        signal,
        params: { idTool, idJobBoardRegion },
      })
      return dates.data
    } catch (error) {
      useSharedStore().errorHandler(
        error,
        'url /getCountOfCurrentItem does not work'
      )
      return {}
    }
  }

  async getJobBoardsRegions() {
    try {
      const response = await instance.get('getJobBoardsRegions')
      return response.data
    } catch (error) {
      useSharedStore().errorHandler(
        error,
        'url /getJobBoardsRegions does not work'
      )
      return []
    }
  }

  async getLastCountOfAllItems(idDate, idJobBoardRegion) {
    try {
      const response = await instance.get('getOneCountForAllTools', {
        params: { idDate, idJobBoardRegion },
      })
      return response.data
    } catch (error) {
      useSharedStore().errorHandler(
        error,
        'url /getLastCountOfAllItems does not work'
      )
    }
    return 'wtf'
  }
}

export default new API()
