const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/9787e04c507db6bf9b318a22c11b3627/${latitude},${longitude}`;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            return callback('Unable to connect to weather service');       
        }
        if (body.error) {
            return callback('Unable to find location!');            
        } 
        return callback(undefined, {
            summary: body.daily.data[0].summary,
            temperature: body.currently.temperature,
            precipitationProb: body.currently.precipProbability
        }) 
    })
};

module.exports = forecast;