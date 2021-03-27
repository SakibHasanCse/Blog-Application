const express = require('express')
const { authAdminMiddleware, doUpdateAndDelete, authUserMiddleware, requireSignin } = require('../controller/auth')
const { createBlog, deleteBlog, relatedProducts, UsersBlogs, SchearchProducts, updateBlog, blogPhoto, allBlog, singleBlog, listAllBlogTagsCategories } = require('../controller/blog')

const router = express.Router()

router.post('/blog', requireSignin, authAdminMiddleware, createBlog);
router.get('/blogs', allBlog);
router.post('/blogs-categories-tags', listAllBlogTagsCategories);
router.delete('/blog/:slug', requireSignin, authAdminMiddleware, deleteBlog);
router.put('/blog/:slug', requireSignin, authAdminMiddleware, updateBlog);
router.get('/blog/:slug', singleBlog);
router.get('/blog/photo/:slug', blogPhoto);
router.post('/blogs/releted', relatedProducts)
router.get('/blogs/search', SchearchProducts)

///user blog posts


router.post('/user/blog', requireSignin, authUserMiddleware, createBlog);
router.get('/:username/blogs', UsersBlogs);
router.delete('/user/blog/:slug', requireSignin, authUserMiddleware, doUpdateAndDelete, deleteBlog);
router.put('/user/blog/:slug', requireSignin, authUserMiddleware, doUpdateAndDelete, updateBlog);


module.exports = router