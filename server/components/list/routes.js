const Router = require('express')

const router = new Router()
const controller = require('./controllers')

router.get('/getCategories', controller.getCategories)
router.get('/getDates', controller.getDates)
router.get('/getTools', controller.getTools)

// router.post('/createList', controller.createList)
router.get('/getLists', controller.getLists)

router.get('/getDataNumberOfVacancies', controller.getDataNumberOfVacancies) // for test

module.exports = router
