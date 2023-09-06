import instance from '@/config/api.js'

class API {
  async registrationUser(email, password) {
    try {
      const user = await instance.post('registration', {
        email,
        password,
      })
      return user.data
    } catch (error) {
      throw error.response.data.error
    }
  }

  async loginUser(email, password) {
    try {
      const user = await instance.post('login', { email, password })
      return user.data
    } catch (error) {
      throw error.response.data.error
    }
  }

  async logoutUser() {
    await instance.post('logout')
  }

  async refreshToken() {
    try {
      return await instance.get('refresh_token')
    } catch (error) {
      console.log(error)
      return 'wtfFIXME'
    }
  }
}

export default new API()
