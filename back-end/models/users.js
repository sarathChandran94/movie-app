const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

let user = mongoose.model('User', UserSchema);

module.exports = user;
