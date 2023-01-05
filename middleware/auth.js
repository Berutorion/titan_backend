const passport = require("passport")
const {QRAuth} = require("../models")
const {getToday} = require("../helper/dateTime")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

module.exports = {
    Authenticated : passport.authenticate("jwt" , {session:false , failWithError:true}),
    QRcodeAuthenticated:async(req,res,next) =>{
        const {authNum,time} = req.body
        //獲取今天的時間範圍
        const today =  getToday(time)
        try {
          currentAuth =  await QRAuth.findOne({
            raw:true,
            where:{
                createdAt:{
                    [Op.between]:[today.startTime,today.endTime]
        }}})
          if(currentAuth.authNum === authNum){
            next()
          }else{
            throw new Error("QRcode憑證過期")
          } 
        } catch (error) {
            next(error)
        }
    }
}