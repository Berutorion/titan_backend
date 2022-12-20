
const router = require("express").Router()

const {Authenticated} = require("../middleware/auth")
const {errorHandler} = require("../middleware/errorHaddler")
const {userRoute,adminRoute} = require('../router')

router.use((req,res,next) =>{
    console.log("here is router") 
next()})

router.use('/user' ,Authenticated,userRoute )
router.use('/admin',adminRoute)


router.get('/test' ,Authenticated, (req,res) =>{
    res.json({
        message:"test"
    })
})


router.use(errorHandler)

module.exports = router