const passport = require("passport")

module.exports = {
    Authenticated : passport.authenticate("jwt" , {session:false , failWithError:true})
}