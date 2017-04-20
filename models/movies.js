const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//movie schema
const movieSchema = mongoose.Schema({
    title: String,
    imageURL: String,
    releaseDate: Date,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;