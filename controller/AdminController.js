const bcrypt = require("bcryptjs")
const {User,QRAuth} = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const authGenerate = require("../helper/authGenerate")
const {getToday} = require('../helper/dateTime')

module.exports ={
    addNewUser : async(req,res) =>{
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
    },
    getQRcode: async(req,res,next) =>{
       const time =  req.query.time
       try {
        //獲取今天的時間範圍
        const today =  getToday(time)
        //查詢今天是否產生過authNum
        const qrAuth = await QRAuth.findOne({
            where:{createdAt:{ 
                [Op.between]:[today.startTime,today.endTime]
            }}})
        if(!qrAuth){
            const authNum = authGenerate(10)
            await QRAuth.create({authNum})
            return res.json({status:"success",authNum:authNum})
        }
            return res.json({status:"success",authNum:qrAuth.authNum})
       } catch (error) {
        next(error)
       }
    },
    updateUserStatus: async(req,res,next) =>{
        const {lock , status,userId} = req.body
        try {
            if(lock !== null){
                await User.update({lock,errorTimes:5},{where:{id:userId}})
                return res.json({status:"success",message:"解鎖成功"})
            }
        } catch (error) {
            next(error)
        }
    }
}