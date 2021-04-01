const express = require('express')
const router = express.Router()
const { ContactFormValidator } = require('../validator/form')
const { ContactForm, ContactBlog_AuthorForm } = require('../controller/form')
const { runValidation } = require('../validator')


router.post('/contact', ContactFormValidator, runValidation, ContactForm)
router.post('/contact-blog-author', ContactFormValidator, runValidation, ContactBlog_AuthorForm)

module.exports = router