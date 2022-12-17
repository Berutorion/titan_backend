const express = require("express")
const app = express()
const router = require("./router/router")
const passport = require("./config/passport")
require("dotenv").config()
const port = process.env.PORT || 8080

app.listen(port , () =>{
    console.log('Server is working')
})

app.use(express.json())
app.use(passport.initialize())

app.use("/" , router)

// app.get("/" , (req,res) =>{
//     res.send("hello word")
// })