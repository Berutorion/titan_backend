
const router = require('express').Router()
const UserController = require("../controller/UserController")
const {QRcodeAuthenticated} = require("../middleware/auth")

router.get('/' , UserController.getUser)
router.post('/check' ,UserController.Attendance )
router.post('/qrcodeCheck',QRcodeAuthenticated,UserController.Attendance)

module.exports = router