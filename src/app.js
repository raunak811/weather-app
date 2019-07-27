const path = require('path')
const express  = require('express')

const hbs = require('hbs')

console.log(path.join(__dirname,'../public'))

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Raunak'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title : 'About',
        name : 'Raunak'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title : 'Help page',
        name : 'Raunak'
    })
})
app.get('/help/*', (req,res) =>{
    res.render('error',{
        message : 'No help article founds'
    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Pleas provide search term ggg'
        })
    }
    res.send({
        products : []
    })
})


console.log(__dirname)
//console.log(__filename)

// app.get('', (req,res) =>{
//     res.send('<h1>Hello exress<h1>')
// })

app.get('/help', (req,res) =>{
    res.send({
        name:'raun',
        age:25
    })
})

app.get('/about', (req,res) =>{
    res.send('about page')
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Pleas provide address'
        })
    }

    geocode(req.query.address, (error,data) =>{
        if(error){ 
            return res.send({
                error: error
            })
         }else {
             //console.log('errorr',error)
             console.log('data',data)
             forecast(data.latitude,data.longitude, (error, forecastdata) =>{
                 if(error){
                    return res.send({
                        error: error
                    })
                 }else{
                     console.log(forecastdata)
                    res.send({
                        forecast : forecastdata,
                        location: data.location,
                        address : req.query.address
                    })
                 }
                 
                 
             })
         }
         
    })

    
})

app.get('*', (req,res)=>{
    res.render('error',{
        message : 'Page not found'
    })
})



app.listen(3000, () =>{
    console.log('server is up on 3000')
})