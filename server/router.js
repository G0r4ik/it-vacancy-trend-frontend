const Router = require('express')
// const authMiddleware = require('./auth-middleware')

const router = new Router()
const controller = require('./controller')

router.get('/getCategories', controller.getCategories)
router.get('/getDates', controller.getDates)
router.get('/getTools', controller.getTools)

router.post('/registrationUser', controller.registrationUser)

router.get('/activateAccount', controller.activateAccount)
router.post('/refreshToken', controller.refreshToken)
router.post('/loginUser', controller.loginUser)
router.post('/logout', controller.logout)

// router.post('/createList', controller.createList)
router.get('/getLists', controller.getLists)

router.get('/getDataNumberOfVacancies', controller.getDataNumberOfVacancies) // for test

module.exports = router
