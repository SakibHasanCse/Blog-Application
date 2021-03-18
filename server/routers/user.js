const express = require('express')
const { authAdminMiddleware, authUserMiddleware, requireSignin, } = require('../controller/auth')
const { read, userwithBlogs, userPhoto, updateUsers } = require('../controller/user')

const router = express.Router()

router.get('/user/profile', requireSignin, authUserMiddleware, read);
router.get('/profile/:username', userwithBlogs);
router.put('/user/profile/:username', requireSignin, authUserMiddleware, updateUsers);
router.get('/user/photo/:username', userPhoto);



module.exports = router