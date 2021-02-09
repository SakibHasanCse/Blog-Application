
const express = require('express')
const { Signup } = require('../controller/user')
const { runValidation } = require('../validator')
const { userSignUpValidator } = require('../validator/auth')
const router = express.Router()

router.post('/signup', userSignUpValidator, runValidation, Signup)


module.exports = router