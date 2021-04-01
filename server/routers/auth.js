const express = require('express')
const { Signup, Signin, signout, requireSignin, ResetPassword, ForgetPassword } = require('../controller/auth')
const { runValidation } = require('../validator')
const { userSignUpValidator, ForgetPasswordValidator, userSiginValidator, ResetPasswordValidator } = require('../validator/auth')
const router = express.Router()

router.post('/signup', userSignUpValidator, runValidation, Signup);
router.post('/signin', userSiginValidator, runValidation, Signin)
router.post('/forget-password', ForgetPasswordValidator, runValidation, ForgetPassword)
router.post('/reset-password', ResetPasswordValidator, runValidation, ResetPassword)

router.get('/signout', signout)


module.exports = router