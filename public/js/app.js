/**
 * Created by Admin on 4/21/2017.
 */
'use strict'
var apiKey = 'd488882c9d53c805e558e55986d4dd20';
var movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
var discoverMovieUrl ='https://api.themoviedb.org/3/discover/movie';

//Discover movies
function discoverMovies(movieDiscoverDisplay) {
    //current date
    var myDate = new Date();
    var endDate = (myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDay() );

    var d = new Date();
    d.setDate(d.getDate() - 7);
    var startDate = (d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() );

    console.log(endDate);
    console.log(startDate);
    var settings = {
        api_key: apiKey
    };
    $.getJSON('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2017-04-15&primary_release_date.lte=2017-04-22&api_key=d488882c9d53c805e558e55986d4dd20', movieDiscoverDisplay);
}

function movieDiscoveryDisplay(data) {

    debugger;
    var resultElement = '';
    $.each(data.results, function(key, result) {
       var title = result.title;
       var poster = result.poster_path;
       var releaseDate = result.release_date.slice(0, 4);
        resultElement +=
            '<div class=col-sm-2>' +
            '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w185'+poster + '">' +'<br>' +
            '<b>' + title + '</b>' + '<br>' +
            'Released ' + releaseDate +
            '</div>';
        return key < 5;
    });
    console.log(resultElement);
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

function displaySearchResults(data) {
    console.log(data);
}

function searchForm () {
    $('#search').click(function(e) {
        e.preventDefault();
        var query = $('#movie-search').val();
        console.log(query);
        getMovie(query, displaySearchResults);
    });
}

$(function() {
    searchForm();
    discoverMovies(movieDiscoveryDisplay);
});