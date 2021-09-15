const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
//logical or NOT A BITWISE
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlerbars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static dir to express
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "baldislev"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'bald'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        msg: 'a help message',
        name: 'baldislev'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
               return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 for help',
        error: 'help article not found',
        name: 'baldislev'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'page not found',
        name: 'baldislev'
    })
})

app.listen(port, () => {
    console.log('The server is up on port ' + port)
})