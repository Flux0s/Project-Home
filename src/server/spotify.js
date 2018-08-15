var SpotifyWebApi = require("spotify-web-api-node");

// Create the authorization URL
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
// console.log(authorizeURL);

module.exports = (redirectUri) => {
  var scopes = ["user-read-private", "user-read-email"],
    redirectUri = "https://example.com/callback",
    clientId = "5fe01282e44241328a84e7c5cc169165",
    state = "some-state-of-my-choice";

  var credentials = {
    redirectUri: redirectUri,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  };

  var spotifyApi = new SpotifyWebApi(credentials);
};
