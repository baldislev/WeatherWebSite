const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVja2FyZHRpYiIsImEiOiJja3N2eHBlM2wweG96MndzMnV4MGxmdXltIn0.RM8gLDO9kgwQy908eWNv0A&limit=1'
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('unable to connect to geo service', undefined)
        } else if(body.features.length === 0) {
            callback('could not find the provided location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode