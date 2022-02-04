const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const user = require('../models/users');

router.post('/newuser', (req, res) => {
    let userData = {}

    user.findOne({ username: req.body.username }, (err, result) => {
        if (result) {
            res.send({msg: 'Username taken!'})
        } else {
            if (req.body.username === 'admin') {
                userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'Admin'
                }
            } else {
                userData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'User'
                }}
            const newUser = user(userData)
            // console.log(newUser);
            newUser.save().then((result) => {
                console.log(result)
                res.send({ msg: 'user added successfully' })
            }).catch(e => console.log(e))
        }
    })

})

router.post('/login', (req, res) => {
    const usrMail = req.body.email;
    user.findOne({ email: usrMail }, (err, result) => {
        if (result === null) {
            res.send({ msg: 'user not found', error: err })
        }
        else if (result.email === usrMail && result.password !== req.body.password) {
            res.send({ msg: 'password incorrect', user: result })
        }
        else if (result.email === usrMail && result.password === req.body.password) {
            res.send({ msg: 'Logged in', user: result })
        }
    })
})

module.exports = router;
