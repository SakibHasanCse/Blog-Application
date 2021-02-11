
const express = require('express')
const { authUserMiddleware, authAdminMiddleware, requireSignin } = require('../controller/auth')
const { createCategory, read, list, deleteCategory } = require('../controller/category')
const { runValidation } = require('../validator')
const { categoryValidator } = require('../validator/category')


const router = express.Router()

router.post('/category', categoryValidator, runValidation, requireSignin, authAdminMiddleware, createCategory);
router.get('/categorys', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, authAdminMiddleware, deleteCategory);




module.exports = router