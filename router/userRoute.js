
const router = require('express').Router()
const UserController = require("../controller/UserController")



router.post('/check' ,UserController.Attendance )

module.exports = router