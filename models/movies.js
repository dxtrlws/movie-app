const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//movie schema
const movieSchema = mongoose.Schema({
    title: String,
    imageURL: String,
    releaseDate: String,
    overview: String,
    rating: String,
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;