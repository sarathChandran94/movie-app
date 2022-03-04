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

    user.findOne({ email: email}, async (err, userFound) => {
        if (err) {
            console.log(`err: ${err}`)
            res.send({msg: err.Error})
        }
        else if (userFound) {
            res.send({msg: 'User already exists!'})
            console.log(`userFound: ${userFound}`)
        }
        else if (!userFound) {
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
            console.log(newUser);
            newUser.save()
                .then((result) => {
                    console.log(`New user: ${result}`)
                    res.send({ msg: 'Registration successfull!', user: result })
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
            res.status(500).send({msg: 'Server error', error: err})
        }
        else if (result === null) {
            res.send({ msg: 'Email Incorrect!', error: err })
        }
        else if (result) {
            bcrypt.compare(password, result.password)
                .then(data => {
                    // console.log(data)
                    if (!data) {
                        res.send({ msg: 'Password Incorrect!'})
                    }
                    let payload = {subject: result._id}
                    jwt.sign(payload, process.env.SEC_KEY, (err, token) => {
                        if (err) {
                            res.send({jwtError: err})
                        }
                        if (token) {
                            res.send({ msg: 'Logged in', user: {id: result._id, username: result.username, email: result.email, joined: result.joined, role: result.role} ,token: token})
                        }
                    })
                })
                .catch(e => {
                    res.send({ msg: 'Password is Incorrect!'})
                })
        }
        // else if (result.email === email && result.password !== password) {
        //     res.send({ msg: 'password incorrect', error: err })
        // }
        // else if (result.email === email && result.password === password) {
        //     let payload = {subject: {result}}
        //     jwt.sign(payload, 'secretKey', (err, token) => {
        //         if (err) {
        //             res.send({jwtError: err})
        //         }
        //         if (token) {
        //             res.send({ msg: 'Logged in', user: result ,token: token})
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
                        response.send({ result })
                    }
                    else if (err) {
                        response.send({ err })
                    }
                })
            }
            else {
                response.send({ msg: 'Unauthorized request!'})
            }
        })

})

router.post('/admin/:id', (req, res) => {
    console.log(req.params.id)
    user.findByIdAndDelete(req.params.id)
        .then(result => {
            res.send({msg: 'User successfully deleted', result})
        })
})


router.post('/admin/editUser/:id', (req, res) => {

    console.log(req.body)
    const role = req.body.role;
    console.log(req.params)
    user.findByIdAndUpdate(req.params.id, { role: role }, { upsert: true })
        .then(result => {
            res.send({msg: 'User successfully updated', result})
        })
        .catch(e => console.log(e))
})



module.exports = router;
