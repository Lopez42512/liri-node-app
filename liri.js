require('dotenv').config();

var axios = require('axios');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var moment = require('moment');

var spotify = new Spotify(keys.spotify);

var liriCat = process.argv[2];
var search = process.argv.slice(3).join(" ");
var bandurl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
var movieUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

switch (liriCat) {
    case "spotify":
        spotifysearch();
        break;

    case 'band':
        bandSearch();
        break;
    case 'movie':
        movieSearch();
        break;
    default:
        console.log("Incorrect input try again");


}

function movieSearch() {
    axios.get(movieUrl).then(
        function (err, response) {
            if(err){
                return console.log('error occurred, please try again')
            }
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1].Source + ', ' + response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);

        }
    )
}

function bandSearch() {
    axios.get(bandurl).then(
        function (err, response) {
            if(err){
                return console.log("error occurred, please try again")
            }
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.country);
            console.log(moment(response.data[0].datetime).format('L'));
        });
}

function spotifysearch() {
        spotify.search({ type: 'track', query: search, limit: 1, }, function (err, data) {
            if (err) {
                return console.log("error occurred, please try again");
            }
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(search);
            console.log(data.tracks.items[0].album.name);

        })
    }

