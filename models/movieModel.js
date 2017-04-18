const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

//movie schema
const MovieSchema = mongoose.Schema({
    title:  String,
    imageURL: String,
    releaseDate: Date,
    addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

//user schema
const UserSchema = mongoose.Schema({
   username: {
       type: String,
       required: true,
       unique: true
   } ,
    password: {
       type: String,
        required: true
    }
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt
        .compare(password, this.password)
        .then(isValid => isValid);
}

UserSchema.statics.hashPassword = function() {
    return bcrypt
        .hash(password, 10)
        .then(hash => hash);
}

const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {Movie, User};