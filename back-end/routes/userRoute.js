const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/newuser', (req, res) => {
    let userData = {}
    var { name, email, password } = req.body;

    user.findOne({ username: name }, (err, result) => {
        if (err) {
            res.send({msg: err.Error})
        }
        else if (result) {
            res.send({msg: 'Username taken!'})
        }
        else if (!err) {
            const salt = bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hash(password, salt)
            if (name === 'admin') {
                userData = {
                    username: name,
                    email: email,
                    password: hashedPassword,
                    role: 'Admin'
                }
            }
            else {
                userData = {
                    username: name,
                    email: email,
                    password: hashedPassword,
                    role: 'User'
                }
            }
            const newUser = user(userData)
            // console.log(newUser);
            newUser.save()
                .then((result) => {
                    console.log(result)
                    res.send({ msg: 'user added successfully' })
                })
                .catch(e => console.log(e))
        }
    })

})

router.post('/login', (req, res) => {
    var { email, password } = req.body;
    user.findOne({ email: email }, (err, result) => {
        if (result === undefined) {
            console.log(`some error occured!`)
            res.status(500).send({msg: 'some error occured', error: err})
        }
        else if (result === null) {
            res.send({ msg: 'user not found', error: err })
        }
        else if (result.email === email && result.password !== password) {
            res.send({ msg: 'password incorrect', error: err })
        }
        else if (result.email === email && result.password === password) {
            let payload = {subject: {result}}
            jwt.sign(payload, 'secretKey', (err, token) => {
                if (err) {
                    res.send({jwtError: err})
                }
                if (token) {
                    res.send({ msg: 'Logged in', user: result ,token: token})
                }
            })
        }
    })
})


router.get('/admin', (req, res) => {
    user.find( (err, result) => {
        if (result) {
            res.send({ result })
        }
        else if (err) {
            res.send({ err })
        }
    })
})



module.exports = router;
