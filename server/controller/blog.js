const Blog = require('../models/blogs')
const Category = require('../models/category')
const Tags = require('../models/tags')
const formidable = require('formidable')
const _ = require('lodash')
const slugify = require('slugify')
const { stripHtml } = require('string-strip-html')
const { errorHandler } = require('../helpers/dbErrorHandel')
const fs = require('fs')
const { smartTrim } = require('../helpers/blog')

exports.createBlog = async (req, res, next) => {
    try {
        const form = new formidable.IncomingForm()
        form.keepExtension = true
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err)
                return res.status(400).json({

                    error: 'Image could not uploaded'
                })
            }

            const { title, body, categories, tags } = fields
            if (!title || !title.length) {
                return res.status(400).json({
                    error: 'Title is required'
                })
            }

            if (!categories || categories.length < 0) {
                return res.status(400).json({
                    error: 'Categories is required'
                })
            }
            if (!tags || tags.length < 0) {
                return res.status(400).json({
                    error: 'Tags is required'
                })
            }
            if (!body || body.length < 200) {
                return res.status(400).json({
                    error: 'Body is required'
                })
            }

            const newCategory = categories && categories.split(',')
            const newTags = tags && tags.split(',')
            let blog = new Blog()
            blog.title = title
            blog.body = body
            blog.excerpt = smartTrim(body, 320, ' ', '...')
            blog.slug = slugify(title).toLowerCase()
            blog.mtitle = `${title} | ${process.env.APP_NAME}`
            blog.mdesc = stripHtml(body.substring(0, 160)).result
            blog.postedBy = req.user._id

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less the 1mb'
                    })
                }

                blog.photo.data = fs.readFileSync(files.photo.path)
                blog.photo.contentType = files.photo.type
            }


            blog.save((err, data) => {
                if (err) {
                    console.log(err)

                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                Blog.findByIdAndUpdate(data._id, { $push: { categories: newCategory, tags: newTags } },
                    { new: true }).exec((err, result) => {
                        if (err) {
                            console.log('err' + err)

                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        } else {
                            return res.status(201).json(result)

                        }

                    })

            })



        })
    } catch (error) {
        error: 'Internal server error , try again'

    }

}