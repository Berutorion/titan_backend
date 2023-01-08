
const router = require('express').Router()
const adminController = require('../controller/AdminController')


router.use((req,res,next) =>{
    console.log("here is admin") 
next()})

router.post('/newUser' ,adminController.addNewUser)
router.get('/qrcode' , adminController.getQRcode)
router.patch('/userStatus',adminController.updateUserStatus)

module.exports = router