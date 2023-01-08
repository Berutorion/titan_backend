
const jwtToken = require("jsonwebtoken")
const {AttendanceSheet,User} = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const {getToday} = require('../helper/dateTime')
const dayjs = require("dayjs")
const bcrypt = require("bcryptjs")
module.exports ={

    LogIn: async(req,res,next) =>{
        const user = req.user.toJSON()
        try {
            delete user.password
            const token = jwtToken.sign(user,process.env.JWT_SECRET,{expiresIn:'30d'})
            res.json({
                status:"success",
                token:token,
                role:user.role
            })
        } catch (error) {
           next(error)
        }
    },
    getUser: async(req,res,next) => {
        try {
            const user = req.user.toJSON()
            const userData = await User.findOne(
                {where:{id:user.id},
                raw:true,
                nest:true,
                include:[{model:AttendanceSheet}]})
            console.log(userData)
            res.json({
                status:"success",
                user:userData,
                AtWork:userData.AttendanceSheets.checkIn?true:false
            })
        } catch (error) {
            next(error)
        }      
    } ,
    updateUser : async(req ,res ,next) =>{
        try {
            const {password , checkPassword} = req.body
            const user = req.user
            if(password !== checkPassword) throw new Error("兩次密碼輸入不同")
            await User.update({password:await bcrypt.hash(password,10)},{where:{id:user.id}})
            res.json({status:"success" , message:"密碼更改成功"})
        } catch (error) {
            next(error)
        }

    },
    Attendance: async(req,res,next) =>{
        const {jobId,time} = req.body
        try {
            //獲取今天的時間範圍
            const today =  getToday(time)
            //如果 AtWork存在表示今天打過卡
            const AtWork = await AttendanceSheet.findOne({
                where:{
                    jobId,
                    checkIn:{
                    [Op.between]:[today.startTime,today.endTime]
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
         res.json({status:"success"})
        } catch (error) {
            next(error)
        }
    },
    }
