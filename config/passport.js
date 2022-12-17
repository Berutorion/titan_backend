

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
    const passwordMatch = bcrypt.compare(password , user.password)
    if(!passwordMatch) throw new Error("密碼錯誤")

    done(null,user)
} catch (error) {
    done(error,false)
}

       
    })
)

const JWToption = {
    secretOrKey : process.env.JWT_SECRET,
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken
}

//JWT
passport.use(
    new JwtStrategy(JWToption , async(jwt_payload, done) => {
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