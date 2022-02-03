const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./db/conn");
const users = require('./routes/userRoute');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/register', users);

require('dotenv').config({ path: './config/config.env' });


app.get("/", (req, res) => {
    res.json({msg: "server"})
})



const port = process.env.PORT ;
app.listen(port, () => {
    database;
    console.log(`Connected to port: ${port}`);
})
