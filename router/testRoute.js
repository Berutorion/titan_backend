const router = require("express").Router()
const dayjs = require("dayjs")
// require('dayjs/locale/zh-tw')
// dayjs.locale('zh-cn') // 当前实例使用

router.get('/' ,(req,res) =>{
    res.json({
        message:"test"
    })
})

router.get('/time' , (req,res,next) =>{

    const now = dayjs().format('YYYY/MM/DD HH:mm')
    res.json({status:"seccess" , message:now})
})
module.exports = router