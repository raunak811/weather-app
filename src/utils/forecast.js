const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'https://api.darksky.net/forecast/c0b9a60a01b66daa0520d87f299e8179/'+lat+','+long+''

    request({url:url, json:true},(error,response)=>{
        if(error){

            callback('Unable to connect',undefined)

        } else if(response.body.error){
            callback('Unable to connect',undefined)
        }else{
            callback(undefined,`It is curretly ${response.body.currently.temperature} degree out. Tere is ${response.body.currently.precipProbability} % chance of rain`)
        }
    })
}

module.exports = forecast