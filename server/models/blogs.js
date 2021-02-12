const mongoose = require('mongoose')
const crypto = require('crypto')
const { ObjectId } = mongoose.Schema
const BlogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 160
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    body: {
        type: {},
        required: true,
        min: 200,
        max: 2000000

    },
    excerpt: {
        type: String,
        max: 100
    }
    , mtitle: {
        type: String
    },
    mdesc: {
        type: String
    }, photo: {
        data: Buffer,
        contentType: String
    }, categories: [{
        type: ObjectId,
        ref: 'category',
        required: true,

    }], tags: [{
        type: ObjectId,
        ref: 'tags',
        required: true,

    }], postedBy: {
        type: ObjectId,
        ref: User
    }

}, { timestamps: true })


module.exports = mongoose.model('blog', BlogsSchema)