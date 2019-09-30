// Core Node Modules
const path = require('path');

// NPM Modules
const express = require('express')
const hbs = require('hbs')
const request = require('request')

// Utils
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('/', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: "John G"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help Page",
        name: "John G",
        description: "This is the help page!"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Me",
        name: "John G"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast:forecastData,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req,res) => {
    // return error if no address and stop processing
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Help Article Not Found",
        name: "John G"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "Page Not Found",
        name: "John G"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})