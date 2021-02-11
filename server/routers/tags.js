
const express = require('express')
const { authUserMiddleware, authAdminMiddleware, requireSignin } = require('../controller/auth')
const { createTags, read, list, deleteTags } = require('../controller/tags')
const { runValidation } = require('../validator')
const { tagsValidator } = require('../validator/tags')


const router = express.Router()

router.post('/tag', tagsValidator, runValidation, requireSignin, authAdminMiddleware, createTags);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, authAdminMiddleware, deleteTags);


module.exports = router