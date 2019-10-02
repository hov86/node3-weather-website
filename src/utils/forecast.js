const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/93d9b31a0c45381659f924ee506974b4/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined,`Today's Forecast: ${body.daily.data[0].summary} With a high of ${body.daily.data[0].temperatureHigh} degrees and a low of ${body.daily.data[0].temperatureLow} degrees, it is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast