const express = require('express')
const { authAdminMiddleware, authUserMiddleware, requireSignin, } = require('../controller/auth')
const { read, userwithBlogs } = require('../controller/user')

const router = express.Router()

router.get('/profile', requireSignin, authUserMiddleware, read);
router.get('/profile/:username', userwithBlogs);



module.exports = router