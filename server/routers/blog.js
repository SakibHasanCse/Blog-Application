
const express = require('express')
const { authAdminMiddleware, requireSignin } = require('../controller/auth')
const { createBlog } = require('../controller/blog')

const router = express.Router()

router.post('/blog', requireSignin, authAdminMiddleware, createBlog);



module.exports = router