/**
 * Created by Admin on 4/21/2017.
 */
'use strict'
var apiKey = 'd488882c9d53c805e558e55986d4dd20';
var movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
var discoverMovieUrl = 'https://api.themoviedb.org/3/discover/movie';

//Discover movies
function discoverMovies(movieDiscoverDisplay) {
    //current date
    var myDate = new Date();
    var eYear = myDate.getFullYear();
    var eMonth = myDate.getMonth() + 1;
    var eDay = myDate.getDay();
    var endDate = (eYear + '-' + eMonth + '-' + eDay);

    //get day 7 days prior
    var e = new Date(new Date().setDate(new Date().getDate() - 7))
    var sYear = e.getFullYear();
    var sMonth = e.getMonth() + 1;
    var sDay = e.getDay();
    var startDate = (sYear + '-' + sMonth + '-' + sDay);
    //set new url 
    discoverMovieUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=' + startDate + '&primary_release_date.lte=' + endDate;
    var settings = {
        api_key: apiKey
    };
    $.getJSON(discoverMovieUrl, settings, movieDiscoverDisplay);
}

function movieDiscoveryDisplay(data) {

    var resultElement = '';
    $.each(data.results, function(key, result) {
        var title = result.title;
        var poster = result.poster_path;
        var releaseDate = result.release_date.slice(0, 4);
        resultElement +=
            '<div class="col-md-2 playing">' +
            '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w342' + poster + '">' + '<br>' +
            '<b>' + title + '</b>' + '<br>' +
            'Released ' + releaseDate + '<br>' +
            '<i class="fa fa-play-circle" aria-hidden="true"></i> Play Trailer      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Details' +
            '</div>';
        return key < 5;
    });

    $('#nowPlaying').html(resultElement);
}

//Movie Search
function getMovie(query, callback) {
    var settings = {
        api_key: apiKey,
        query: query,
        language: 'en-US',
        page: 1,
        include_adult: false
    };

    console.log(settings);
    $.getJSON(movieSearchUrl, settings, callback);
}

function displayMovieResults(data) {
    var resultElement = "";
    $.each(data.results, function(key, result) {
        var title = result.title;
        var poster = result.poster_path;
        var releaseDate = result.release_date;
        var voteAverage = result.vote_average;
        var overview = result.overview;
        resultElement +=
            '<p>' + title + '</p>';
    });
    console.log(resultElement)
    $('#movieResults').html(resultElement);
}

function searchForm() {
    $('#search').click(function(e) {
        e.preventDefault();
        var query = $('#movieSearch').val();
        console.log(query);
        getMovie(query, displayMovieResults);
    });
}





$(function() {
    searchForm();
    discoverMovies(movieDiscoveryDisplay);
});