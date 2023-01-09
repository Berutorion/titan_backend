
const router = require("express").Router()

const {Authenticated} = require("../middleware/auth")
const {errorHandler} = require("../middleware/errorHaddler")
const {userRoute,adminRoute,testRoute} = require('../router')
const UserController = require("../controller/UserController")
const passport = require("passport")

router.post("/login" , passport.authenticate("local" , {session:false}),
UserController.LogIn)

router.use('/user' ,Authenticated,userRoute )
router.use('/admin',adminRoute)
router.use('/test' , testRoute)





router.use(errorHandler)

module.exports = router