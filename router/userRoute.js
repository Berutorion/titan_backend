
const router = require('express').Router()
const UserController = require("../controller/UserController")
const passport = require("passport")

router.post("/login" , passport.authenticate("local" , {session:false}),
UserController.LogIn)

module.exports = router