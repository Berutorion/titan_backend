
const jwtToken = require("jsonwebtoken")
const {AttendanceSheet,User} = require("../models")
const Sequelize = require("sequelize")
const op = Sequelize.Op
const dayjs = require('dayjs')

const NodeGeocoder = require('node-geocoder');
module.exports ={

    LogIn: async(req,res,next) =>{
        const user = req.user.toJSON()
        try {
            delete user.password
            const token = jwtToken.sign(user,process.env.JWT_SECRET,{expiresIn:'30d'})
            res.json({
                status:"success",
                token:token,
            })
        } catch (error) {
            console.log(error)
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
    getCurrentPosition: async(req,res,next) =>{
        const options = {
            provider: 'google',
          
            // Optional depending on the providers
            apiKey: 'AIzaSyDLcMD8ShXFEC3LBhVKhgG160EgeqtQW5k', // for Mapquest, OpenCage, Google Premier
            formatter: null // 'gpx', 'string', ...
          };
          
          const geocoder = NodeGeocoder(options);
       
          // Using callback
          try {
            const respense = await geocoder.geocode('台北市內湖區民權東路六段90巷16弄14號1樓');
            res.json({respense})
          } catch (error) {
            next(error)
          }    
    }
    }
