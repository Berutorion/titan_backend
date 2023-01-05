const router = require("express").Router()
const {QRAuth,AttendanceSheet} = require("../models")
const {timeFormat,getToday} = require("../helper/dateTime")
const dayjs = require('dayjs')

router.get('/' ,(req,res) =>{
    res.json({
        message:"test"
    })
})

router.get('/time' , async(req,res,next) =>{
    
    const newDate = getToday("2023-01-05T17:47:06+08:00")
    res.json({status:"seccess" , message:newDate})
})
module.exports = router