const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/config.env' });
const verifyToken = require('../middlewares/authMiddleware');

router.post('/newuser', (req, res) => {
    let userData = {}
    var { username, email, password } = req.body;

    user.findOne({ email: email }, async(err, result) => {
        if (err) {
            res.json({msg: err.Error})
        }
        else if (result) {
            res.json({msg: 'User already exists!'})
        }
        else if (!err) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            if (username === 'admin') {
                userData = {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    role: 'Admin'
                }
            }
            else {
                userData = {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    role: 'User'
                }
            }
            const newUser = user(userData)
            // console.log(newUser);
            newUser.save()
                .then((result) => {
                    console.log(`New user: ${result}`)
                    res.json({ msg: 'Registration successfull!', user: result })
                })
                .catch(e => console.log(`Error saving new User: ${e}`))
        }
    })

})

router.post('/login', (req, res) => {
    var { email, password } = req.body;
    user.findOne({ email: email }, (err, result) => {
        if (result === undefined) {
            console.log(`some error occured @ router.post ==> user.findOne : result === undefined!`)
            res.status(500).json({msg: 'Server error', error: err})
        }
        else if (result === null) {
            res.json({ msg: 'Email Incorrect!', error: err })
        }
        else if (result) {
            bcrypt.compare(password, result.password)
                .then(data => {
                    // console.log(data)
                    if (!data) {
                        res.json({ msg: 'Password Incorrect!'})
                    }
                    let payload = {subject: result._id}
                    jwt.sign(payload, process.env.SEC_KEY, (err, token) => {
                        if (err) {
                            res.json({jwtError: err})
                        }
                        if (token) {
                            res.json({ msg: 'Logged in', user: {id: result._id, username: result.username, email: result.email, joined: result.joined, role: result.role} ,token: token})
                        }
                    })
                })
                .catch(e => {
                    res.json({ msg: 'Password is Incorrect!'})
                })
        }
        // else if (result.email === email && result.password !== password) {
        //     res.json({ msg: 'password incorrect', error: err })
        // }
        // else if (result.email === email && result.password === password) {
        //     let payload = {subject: {result}}
        //     jwt.sign(payload, 'secretKey', (err, token) => {
        //         if (err) {
        //             res.json({jwtError: err})
        //         }
        //         if (token) {
        //             res.json({ msg: 'Logged in', user: result ,token: token})
        //         }
        //     })
        // }
    })
})


router.get('/admin', verifyToken, (req, response) => {
    user.findById(req.userId)
        .then(res => {
            console.log(`Logged in: ${res.role}`)
            if (res.role === 'Admin') {
                user.find( (err, result) => {
                    if (result) {
                        response.json({ result })
                    }
                    else if (err) {
                        response.json({ err })
                    }
                })
            }
            else {
                response.json({ msg: 'Unauthorized request!'})
            }
        })

})



module.exports = router;
