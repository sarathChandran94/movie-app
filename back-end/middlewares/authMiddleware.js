const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config({ path: './config/config.env' });

const tokenAuth = (req,res, next) => {
    if (!req.headers.authorization) {
        return res.send({msg: 'Unauthorized'})
    }
    let token = req.headers.authorization.split(" ")[1];
    // console.log(`token@authmiddleware: ${token}`)
    if (token === 'null') {
        return res.send({msg: 'Unauthorized'})
    }
    if (!token) {
        return res.send({msg: 'Unauthorized'})
    }
    if (token) {
        let payload = jwt.verify(token, process.env.SEC_KEY)
        if (!payload) {
            return res.send({msg: 'Unauthorized'})
        }
        req.userId = payload.subject
    }

    // console.log(`payload== ${payload.subject}`)
    // console.log(req.userId)
    next();
}

module.exports = tokenAuth;
