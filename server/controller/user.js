
const User = require('../models/user')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const expressJTW = require('express-jwt')

exports.read = (req, res) => {
    req.profile.hash_password = undefined;
    return res.json(req.profile)
}
