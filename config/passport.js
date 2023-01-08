

const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const {User} = require("../models")
const passport = require("passport")
const bcrypt = require("bcryptjs")

require("dotenv").config()
//Local
passport.use(
    new LocalStrategy({usernameField:"name" , passwordField:"password"},
        async(name,password,done)=>{
try {
    console.log("Local")
    const user = await User.findOne({where:{name}})
    if(!user) throw new Error("使用者不存在")
    if(user.lock) throw new Error("帳號已被鎖定，請尋找管理員解決")
    const passwordMatch = await bcrypt.compare(password , user.password)
    if(!passwordMatch){
        await user.update({errorTimes:user.errorTimes-1})
        await user.save()
        if(user.errorTimes !== 0){
            throw new Error(`密碼錯誤,還剩${user.errorTimes}次機會`)
        }else{
            await user.update({lock:true})
            await user.save()
            throw new Error("帳號已被鎖定，請尋找管理員解決")
        }   
    } 
    done(null,user)
} catch (error) {
    done(error,false)
}

       
    })
)

const JWToption = {
    secretOrKey : process.env.JWT_SECRET,
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}

//JWT
passport.use(
    new JwtStrategy(JWToption , async(jwt_payload, done) => {
        console.log('JwtStrategy')
        try {
            const user = await User.findOne({where:{name:jwt_payload.name}})
            if(!user) throw new Error("使用者不存在")
            done(null,user)
        } catch (error) {
            done(error , false)
        }
    })
)


module.exports = passport