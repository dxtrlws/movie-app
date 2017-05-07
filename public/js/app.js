/**
 * Created by Admin on 4/21/2017.
 */
'use strict'
var apiKey = 'd488882c9d53c805e558e55986d4dd20';
var movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
var nowPlaying = 'https://api.themoviedb.org/3/movie/now_playing';
var upcoming = 'https://api.themoviedb.org/3/movie/upcoming';

// Movie API settings
var settings = {
    api_key: apiKey,
    region: 'US',
    adult: false,
    // sort_by: release_date.desc
}

//Get movies
function getMovies(movieDiscoveryDisplay, upcomingMovieDisplay) {
    // var settings = {
    //     api_key: apiKey,
    //     region: 'US'
    // };

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
// function upcomingMovieDisplay(data) {
//     var resultElement = '';
//     $.each(data.results, function(key, result) {
//         var movieID = result.id;
//         var getMovieVideo = 'https://api.themoviedb.org/3/movie/' + movieID + '/videos?api_key='
//         var key = '';
//         var title = result.title;
//         var poster = result.poster_path;
//         var releaseDate = moment(result.release_date).format('LL');

//         $.getJSON(getMovieVideo, settings, getMovieTrailer);

//         function getMovieTrailer(data) {
//             $.each(data.results, function(key, result) {
//                 key = result.key;

//             });
//         }


//         resultElement +=
//             '<div class="col-md-2 playing">' +
//             '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w342' + poster + '">' + '<br>' +
//             '<b>' + title + '</b>' + '<br>' +
//             'Release: ' + releaseDate + '<br>' +
//             '<a data-fancybox="gallery" href="https://www.youtube.com/watch?v=' + key + '"><i class="fa fa-play-circle" aria-hidden="true"></i> Play Trailer </a>' +
//             '</div>';
//         return key < 5;
//     });

//     $('#upcoming').html(resultElement);
// }


function upcomingMovieDisplay(data) {
    var resultElement = '';

    $.each(data.results, function(key, result) {
        var movieID = result.id;
        var getMovieVideo = 'https://api.themoviedb.org/3/movie/' + movieID + '/videos';
        var title = result.title;
        var poster = result.poster_path;
        var releaseDate = moment(result.release_date).format('LL');

        getMovieTrailer(getMovieVideo);

        var movieKey = '';

        resultElement +=
            '<div class="col-md-2 playing">' +
            '<img class="img-responsive poster-image" src="http://image.tmdb.org/t/p/w342' + poster + '">' + '<br>' +
            '<b>' + title + '</b>' + '<br>' +
            'Release: ' + releaseDate + '<br>' +
            '<div class ="movieTrailer" id="' + movieID + '">' +
            '<a data-fancybox="gallery" href="https://www.youtube.com/watch?v=' + movieKey + '"><i class="fa fa-play-circle" aria-hidden="true"></i> Play Trailer </a>' +
            '</div>' +
            '</div>';
        return key < 5;

    });

    $('#upcoming').html(resultElement);
}

// // Get movie Trailer
function getMovieTrailer(data) {
    $.getJSON(data, settings, function(movie) {
        console.log(movie.results[0].key);
        return movie.results[0].key;
    });
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
    $('#movieResults').on("click", ".submitMovie", function(e) {

        e.preventDefault();
        var details = $(this).parent().parent().parent().parent();
        var title = details.find('.movieTitle').text();
        var imageURL = details.find('img').attr('src');
        var releaseDate = details.find('.movieDate').text();
        var overview = details.find('.overview').text();
        var newMovie = { title: title, imageURL: imageURL, releaseDate: releaseDate, overview: overview };
        $.ajax({
                url: '/mymovies',
                data: newMovie,
                type: 'POST',
                dataType: 'json',
            })
            .done(function(data) {
                window.location.href = data.redirect;
            });
    });
}

// Remove move from database

function removeMovieToDB() {
    $('.removeMovie').click(function() {
        var id = $(this).closest('.card').attr('id');
        console.log(id);
        // var deleteMovie = { id: deleteMovie };

        $.ajax({
                url: '/mymovies/' + id,
                data: id,
                type: 'DELETE',
                // dataType: 'json'
            })
            .done(function(data) {
                window.location.href = data.redirect;
            });
    });

}


$(function() {
    searchForm();
    getMovies(movieDiscoveryDisplay, upcomingMovieDisplay);
    addMovieToDB();
    removeMovieToDB()
});