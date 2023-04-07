import instance from '@/config/api'

class API {
  async registrationUser(email, password) {
    const user = await instance.post('registrationUser', {
      email,
      password,
    })
    return user.data
  }

  async loginUser(email, password) {
    const user = await instance.post('loginUser', { email, password })
    return user.data
  }

  async logoutUser() {
    await instance.post('logout')
  }

  async refreshToken(refreshToken) {
    const token = await instance.post('refreshToken', {
      params: { refreshToken },
    })
    return token.data
  }
}

export default new API()
