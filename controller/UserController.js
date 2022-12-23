
const jwtToken = require("jsonwebtoken")
const {AttendanceSheet,User} = require("../models")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const utc = require('dayjs/plugin/utc')
const dayjs = require('dayjs')
dayjs.extend(utc)

module.exports ={

    LogIn: async(req,res,next) =>{
        const user = req.user.toJSON()
        try {
            delete user.password
            const token = jwtToken.sign(user,process.env.JWT_SECRET,{expiresIn:'30d'})
            const AtWork = await AttendanceSheet.findOne({where:{jobId:user.id},attributes:['checkIn']})
            res.json({
                status:"success",
                token:token,
                user:user,
                AtWork:AtWork.checkIn?true:false
            })
        } catch (error) {
           next(error)
        }
    },
    Attendance: async(req,res,next) =>{
        const {jobId,time} = req.body
        try {
            const AtWork = await AttendanceSheet.findOne({
                where:{
                    jobId,
                    checkIn:{
                    [op.gte]:dayjs(time).format('YYYY-MM-DD')
            }}})
            if(AtWork){
              await AtWork.update({
                checkOut:time,
                //下班時間-上班時間<8?曠班:正常
                status:dayjs(time).diff(dayjs(AtWork.checkIn),'hour')< 8 ?"Inactive":"active"})
            }else{
                await AttendanceSheet.create({
                    jobId,
                    checkIn:time,
                    status:"error"})
            }
         res.json({status:"seccess"})
        } catch (error) {
            next(error)
        }
    },
    }
