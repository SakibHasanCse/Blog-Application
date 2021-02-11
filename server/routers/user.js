
const express = require('express')
const { Signup, Signin, signout, requireSignin } = require('../controller/auth')
const { runValidation } = require('../validator')
const { userSignUpValidator, userSiginValidator } = require('../validator/auth')
const router = express.Router()

router.post('/signup', userSignUpValidator, runValidation, Signup);
router.post('/signin', userSiginValidator, runValidation, Signin)
router.get('/signout', signout)


module.exports = router