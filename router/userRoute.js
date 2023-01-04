
const router = require('express').Router()
const UserController = require("../controller/UserController")


router.get('/' , UserController.getUser)
router.post('/check' ,UserController.Attendance )
router.get('/position' , UserController.getCurrentPosition)

module.exports = router