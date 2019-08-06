const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and vies location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Mariana Costa'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Mariana Costa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name: 'Mariana Costa',
        helpMessage: 'How can We help you?'
    })
})

// get takes 2 args (path, and function that indicates what user gets when visiting this route). 
//index.html goes to root page, the others go to the corresponding name eg about.html


/* app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
})  */

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'you must provide a location!'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, placeName} = {}) => { 

        if (error) {
            //error is using shorthand instead of error: error
            return res.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastResponse) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastResponse,
                address: placeName,
                location: req.query.location
            })   
        })        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term!'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Mariana Costa',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Mariana Costa',
        errorMessage: 'Page not found.'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});