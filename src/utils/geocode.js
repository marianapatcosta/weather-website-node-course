const request = require('request')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibWFyaWFuYWFjIiwiYSI6ImNqeXVsbTN1cTBmM2QzZHA4MHlwcnFlYWMifQ.4z7KuKgtiNBm27IiEX07_Q`;
    // use destructuring to get response.body 
    request({url, json: true}, (error, {body}) => {
        if (error) {
           return callback('Unable to connect to geocoding service');   
        }
        if (body.features.length === 0) {
            return callback('Unable to find location! Please provide another location!');        
        }
        return callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            placeName: body.features[0].place_name
        });    
    })
}

module.exports = geocode;