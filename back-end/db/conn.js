const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });

const Db = process.env.ATLAS_URI
const database = () => {
    mongoose.connect(Db, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
        if (err) throw err;
    })
    console.log('Connected to Db')
}

module.exports = database;
