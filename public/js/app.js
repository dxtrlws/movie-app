/**
 * Created by Admin on 4/21/2017.
 */
'use strict'
var apiKey = 'd488882c9d53c805e558e55986d4dd20';
var movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
var nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing';
var upcoming = 'https://api.themoviedb.org/3/movie/upcoming';

//Get movies
function getMovies(movieDiscoveryDisplay, upcomingMovieDisplay) {
    var settings = {
        api_key: apiKey,
        region: 'US'
    };

    $.getJSON(nowPlaying, settings, movieDiscoveryDisplay);
    $.getJSON(upcoming, settings, upcomingMovieDisplay);

}

function movieDiscoveryDisplay(data) {

    var resultElement = '';
    $.each(data.results, function(key, result) {
        var title = result.title;
        var poster = result.poster_path;
        var releaseDate = moment(result.release_date).format('LL');
        resultElement +=
            '<div class="col-md-2 playing">' +
            '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w342' + poster + '">' + '<br>' +
            '<b>' + title + '</b>' + '<br>' +
            'Release: ' + releaseDate + '<br>' +
            '<i class="fa fa-play-circle" aria-hidden="true"></i> Play Trailer      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Details' +
            '</div>';
        return key < 5;
    });

    $('#nowPlaying').html(resultElement);
}
// Display 
function upcomingMovieDisplay(data) {
    var resultElement = '';
    $.each(data.results, function(key, result) {
        var title = result.title;
        var poster = result.poster_path;
        var releaseDate = moment(result.release_date).format('LL');
        resultElement +=
            '<div class="col-md-2 playing">' +
            '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w342' + poster + '">' + '<br>' +
            '<b>' + title + '</b>' + '<br>' +
            'Release: ' + releaseDate + '<br>' +
            '<i class="fa fa-play-circle" aria-hidden="true"></i> Play Trailer      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Details' +
            '</div>';
        return key < 5;
    });

    $('#upcoming').html(resultElement);
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
    $.getJSON(movieSearchUrl, settings, callback);
}

//Display movie search results
function displayMovieResults(data) {
    var resultElement = "";
    if (data.results.length <= 0) {
        resultElement = '<p>There are no movies that matched your query.</p>';
    } else {
        $.each(data.results, function(key, result) {
            var title = result.title;
            var poster = result.poster_path;
            var releaseDate = moment(result.release_date).format('LL');
            var voteAverage = result.vote_average;
            var overview = result.overview;
            var image = '';
            if (poster === null) {
                image = '/images/placeholder.jpg';
            } else {
                image = 'http://image.tmdb.org/t/p/w342' + poster;
            }

            resultElement +=
                '<div class="card">' +
                '<div class="row">' +
                '<div class="col-sm-3">' +
                '<img class="img-responsive" src="' + image + '">' +
                '</div>' +
                '<div class="col-sm-9">' +
                '<div class="movieDetails">' +
                '<p class="movieTitle">' + title + '</p>' +
                '<p class="movieDate"><i class="fa fa-calendar" aria-hidden="true"></i> ' + releaseDate + '</p>' +
                '<p class="overview">' + overview + '</p>' +
                '<div class="addMovie">' +
                '<hr>' +
                '<button type="submit" class="btn btn-default submitMovie">Add Movie</button>' +
                '<a href="#"" class="submitMovie">Add Movie</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }
    $('#movieResults').html(resultElement);
}

// Search for movies
function searchForm() {
    $('#search').click(function(e) {
        e.preventDefault();
        var query = $('#movieSearch').val();
        getMovie(query, displayMovieResults);
    });
}

// Add movie to database

function addMovieToDB() {
    $('#movieResults').on("click", "submitMovie", function(e) {
        e.preventDefault();
        var title = $('this').closest('.movieTitle').html();
        var imageURL = $('this').closest('img').attr('src');
        var releaseDate = $('this').closest('.releaseDate').text();
        var overview = $('this').closest('.overview').text();
        console.log(title);
        console.log(imageURL);
        console.log(releaseDate);
        console.log(overview);
    });
    // $.post("/mymovies", {
    //     title: title,
    //     imageURL: imageURL,
    //     releaseDate: releaseDate,
    //     overview: overview
    // });
}


$(function() {
    searchForm();
    getMovies(movieDiscoveryDisplay, upcomingMovieDisplay);
    addMovieToDB();

});