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
      console.log(error.response.data)
      throw error.response.data.error
    }
  }

  async logoutUser() {
    await instance.post('logout')
  }

  async refreshToken() {
    return instance.get('refresh_token')
  }
}

export default new API()
