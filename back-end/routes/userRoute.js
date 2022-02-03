const express = require('express');
const router = express.Router();
const user = require('../models/users');

router.post('/newuser', (req, res) => {
    console.log(req.body);
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    const newUser = user(userData)
    newUser.save().then( (res) => res.send({msg: 'user added successfully'})).catch(e => res.send(e))

})

module.exports = router;
