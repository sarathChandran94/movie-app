const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });

const Db = process.env.LOCAL_URI
const database = () => {
    mongoose.connect(Db, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
        if (err) throw err;
        console.log(err)
    })
    console.log('Connected to database')

}

module.exports = database;
