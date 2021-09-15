const request = require('postman-request')

const forecast = (latitude, longitude, callback = {}) => {
    const url = 'http://api.weatherstack.com/current?access_key=0d131d4dc19e74f44f9bc3c99eacf81c&query=' + latitude + ',' + longitude

    request({url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. wind speed is " + body.current.wind_speed)
        }
    })
}

module.exports = forecast