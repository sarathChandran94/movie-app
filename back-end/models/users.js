const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    joined: { type: Date,default: Date.now },
})

let users = mongoose.model('User', UserSchema);

module.exports = users;
