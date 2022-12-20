const bcrypt = require("bcryptjs")
const {User} = require("../models")

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
    }
}