
const express = require('express')
const { authAdminMiddleware, requireSignin } = require('../controller/auth')
const { createBlog, deleteBlog, updateBlog, blogPhoto, allBlog, singleBlog, listAllBlogTagsCategories } = require('../controller/blog')

const router = express.Router()

router.post('/blog', requireSignin, authAdminMiddleware, createBlog);
router.get('/blogs', allBlog);
router.post('/blogs-categories-tags', listAllBlogTagsCategories);
router.delete('/blog/:slug', requireSignin, authAdminMiddleware, deleteBlog);
router.put('/blog/:slug', requireSignin, authAdminMiddleware, updateBlog);
router.get('/blog/:slug', singleBlog);
router.get('/blog/photo/:slug', blogPhoto);



module.exports = router