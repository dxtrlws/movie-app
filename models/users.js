const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.validatePassword = function(password) {
    return bcrypt
        .compare(password, this.password)
        .then(isValid => isValid);
}

userSchema.statics.hashPassword = function() {
    return bcrypt
        .hash(password, 10)
        .then(hash => hash);
}

const User = mongoose.model('User', userSchema);

module.exports = {User};