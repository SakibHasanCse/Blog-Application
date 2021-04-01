const { check } = require('express-validator')

exports.ContactFormValidator = [
    check('name').not().notEmpty().withMessage('Name is required'),
    check('email').not().notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be Valid'),
    check('message').not().notEmpty().withMessage('Message is required').isLength({ min: 20 }).withMessage('Message minimum length 20 charecter')
]