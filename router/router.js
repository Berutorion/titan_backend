
const router = require("express").Router()
const passport = require("passport")

const UserController = require("../controller/UserControlloer")
const {Authenticated} = require("../middleware/auth")
const {errorHandler} = require("../middleware/errorHaddler")
const bcrypt = require("bcryptjs")
const {User} = require("../models")

router.use((req,res,next) =>{
    console.log("here is router") 
next()})

router.post("/login" , passport.authenticate("local" , {session:false}),
UserController.LogIn)

router.post("/admin/newUser" , async(req,res) =>{
    const userData = req.body

    try {
       const user = await User.create({
            name:userData.name,
            password: await bcrypt.hash(userData.password,10),
            role:"user"
        })

        if(user){
            res.json({
                status : "success",
                data : user
            })
        } 
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/test' ,Authenticated, (req,res) =>{
    res.send("Test")
})


router.use(errorHandler)

module.exports = router