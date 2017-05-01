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
    var endDate = (myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDay());

    var d = new Date();
    d.setDate(d.getDate() - 7);
    var startDate = (d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay());

    console.log(endDate);
    console.log(startDate);
    var settings = {
        api_key: apiKey
    };
    $.getJSON('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2017-04-23&primary_release_date.lte=2017-04-30&api_key=d488882c9d53c805e558e55986d4dd20', movieDiscoverDisplay);
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