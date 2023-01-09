const dayjs = require("dayjs")
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = {
    dayFormat: (time) =>{
        return dayjs(time).tz('Asia/Taipei').format()
    },
    timeFormat: (time) =>{
        return dayjs(time).tz('Asia/Taipei').format("HH:mm:ss")
    },
    getToday : (time) =>{
        const now = dayjs(time)
        let startTime
        let endTime
        //若現在時間在05:00:00~23:59:59，它就位於 現在日期 05:00:00 ~ 現在日期+1 04:59:59 這個時區
        if(now.isBetween(dayjs().hour(05).minute(0).second(0),dayjs().hour(23).minute(59).second(59)),'hour'){
            startTime = now.hour(05).minute(0).second(0)
            endTime = now.hour(04).minute(59).second(59).add(1,'day')
        }
        //若現在時間在00:00:00~04:59:59，它就位於 現在日期-1 05:00:00 ~ 現在日期 04:59:59 這個時區
        else if(now.isBetween(dayjs().hour(0).minute(0).second(0),dayjs().hour(04).minute(59).second(59),'hour')){
            startTime = now.hour(05).minute(0).second(0).subtract(1,day)
            endTime = now.hour(04).minute(59).second(59)
        }else{
           throw new Error("無法獲取正確時間")
        }

            return {startTime:startTime.tz('Asia/Taipei').format() ,
                    endTime:endTime.tz('Asia/Taipei').format()}
            },
}
