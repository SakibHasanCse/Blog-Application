const express = require('express')
const { authAdminMiddleware, authUserMiddleware, requireSignin, } = require('../controller/auth')
const { read, userwithBlogs, userPhoto, updateUsers } = require('../controller/user')

const router = express.Router()

router.get('/user/profile', requireSignin, authUserMiddleware, read);
router.put('/user/profile', requireSignin, authUserMiddleware, updateUsers);
router.get('/profile/:username', userwithBlogs);
router.get('/user/photo/:username', userPhoto);



module.exports = router