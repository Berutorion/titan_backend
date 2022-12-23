
const router = require('express').Router()
const adminController = require('../controller/AdminController')

router.post('/newUser' ,adminController.addNewUser)

module.exports = router