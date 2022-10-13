const Router = require('express')
const router = new Router()
const controller = require('./controller')

router.get('/getCategories', controller.getCategories)
router.get('/getDates', controller.getDates)
router.get('/getTools', controller.getTools)
router.post('/registrationUser', controller.registrationUser)
router.post('/loginUser', controller.loginUser)
router.post('/logout', controller.logout)
router.get('/activate', controller.activate)

module.exports = router
