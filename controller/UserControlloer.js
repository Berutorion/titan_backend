
const jwtToken = require("jsonwebtoken")

module.exports ={

    LogIn: (req,res) =>{
        const user = req.user.toJSON()
        try {
            delete user.password
            const token = jwtToken.sign(user,'secrete',{expiresIn:'30d'})
            res.json({
                status:"success",
                data:token
            })
        } catch (error) {
            console.log(error)
        }
    }
}