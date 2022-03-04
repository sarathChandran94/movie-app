const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });

const Db = process.env.LOCAL_URI
const database = () => {
    mongoose.connect(Db, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(`error: database not connected`)
            // throw new Error(err);
        }
        else if (!err) {
            console.log('Connected to database')
        }
    })

}

module.exports = database;
