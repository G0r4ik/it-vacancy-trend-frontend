// const tokenService = require('./userServices')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    // if (!authorizationHeader) throw 1
    const accessToken = authorizationHeader.split(' ')[1]
    // if (!accessToken) throw 2
    const userData = tokenService.validateAccessToken(accessToken)
    // if (!userData) throw
    req.user = userData
    console.log(userData)
    next()
  } catch (error) {
    console.log(error)
  }
}
