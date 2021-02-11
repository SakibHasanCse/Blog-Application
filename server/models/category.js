const mongoose = require('mongoose')
const crypto = require('crypto')
const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    }




}, { timestamps: true })


module.exports = mongoose.model('category', CategorySchema)