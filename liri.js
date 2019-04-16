// grab the different npm for the page
require('dotenv').config();

var axios = require('axios');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var moment = require('moment');

var fs = require('fs');

var spotify = new Spotify(keys.spotify);

//get the user input for the switch statement
var liriCat = process.argv[2];
var search = process.argv.slice(3).join(" ");

// api for the axios call
var bandurl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
var movieUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

// switch statement that grabs the user choice
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
    case 'do-what-i-say':
        randomtext();
        break;
    default:
        console.log("Incorrect input try again");


}

//functions for the switch statement to execute
function randomtext() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(',');

        console.log(dataArr[1]);

        spotify.search({ type: 'track', query: dataArr[1], limit: 1, }, function (err, data) {

            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(search);
            console.log(data.tracks.items[0].album.name);
    
        })

    })
}
a
function movieSearch() {
    axios.get(movieUrl).then(
        function (response) {

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
        function (response) {

            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ', ' + response.data[0].venue.country);
            console.log(moment(response.data[0].datetime).format('L'));
        });
}

function spotifysearch() {
    spotify.search({ type: 'track', query: search, limit: 1, }, function (err, data) {

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(search);
        console.log(data.tracks.items[0].album.name);

    })
}

