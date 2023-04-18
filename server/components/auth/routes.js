const Router = require('express')
const router = new Router()
const controller = require('./controller')

router.post('/registrationUser', controller.registrationUser)

router.get('/activateAccount', controller.activateAccount)
router.post('/refreshToken', controller.refreshToken)
router.post('/loginUser', controller.loginUser)
router.post('/logout', controller.logout)

module.exports = router
