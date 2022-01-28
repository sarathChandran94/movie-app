const express = require("express")
const app = new express
const mongoose = require("mongoose")
const cors = require("cors")
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect("", (err) => {
    if (err) { console.log(err) }
    else console.log(`Connected to Mongoose`)
})

app.get("/", (req, res) => {
    res.json({msg: "server"})
})

app.listen(5000,() => console.log(`Server online, port:5000`))
