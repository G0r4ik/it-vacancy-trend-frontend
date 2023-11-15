import instance from '@/config/api.js'
import { useSharedStore } from '@/shared/store.js'

class API {
  async getRankedJobBoardOfRegion(idRegion) {
    try {
      const response = await instance.get('getRankedJobBoardOfRegion', {
        params: { idRegion },
      })
      return response.data
    } catch (error) {
      useSharedStore().errorHandler(
        error,
        'url /getRankedJobBoardOfRegion does not work'
      )
    }
  }

  async getRegions() {
    try {
      const response = await instance.get('getRegions')
      return response.data
    } catch (error) {
      useSharedStore().errorHandler(error, 'url /getRegions does not work')
    }
  }
}

export default new API()
