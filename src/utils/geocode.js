const request = require('request')

const geocode = (address, callback)=>{
    const url =    'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF1bmFrODExIiwiYSI6ImNqdng3dDEzYzAyNmk0M3FwM2lyNWY4dXMifQ.cwHAnOkkzB_WSCi2H9peLQ&limit=1'
   
    request({url: url, json: true}, (error,res)=>{
       if(error) {
           callback('unable to connect')
       }else if(res.body.features.length == 0){
           callback('unable to find location')
       }else{
           callback(undefined,{
               latitude: res.body.features[0].center[1],
               longitude: res.body.features[0].center[0],
               location: res.body.features[0].place_name
           })
       }
    })
   }

   module.exports = geocode