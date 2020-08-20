const {spotUser, spotSecret} = require('./config.json');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: spotUser,
    clientSecret: spotSecret
})

module.exports = spotifyApi;