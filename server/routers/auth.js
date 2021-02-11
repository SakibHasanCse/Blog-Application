
const express = require('express')
const { authAdminMiddleware, authUserMiddleware, requireSignin } = require('../controller/auth')
const { read } = require('../controller/user')

const router = express.Router()

router.get('/profile', requireSignin, authUserMiddleware, read);



module.exports = router