const Blog = require('../models/blogs')
const Category = require('../models/category')
const Tags = require('../models/tags')
const formidable = require('formidable')
const _ = require('lodash')
const slugify = require('slugify')
const { stripHtml } = require('string-strip-html')
const { errorHandler } = require('../helpers/dbErrorHandel')
const fs = require('fs')

exports.createBlog = async (req, res, next) => {
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
        let blog = new Blog()
        blog.title = title
        blog.body = body
        blog.tags = tags
        blog.categories = categories
        blog.slug = slugify(title).toLowerCase()
        blog.mtitle = `${title} | ${process.env.SAKIB_BLOG}`
        blog.mdesc = stripHtml(body.substring(0, 160))
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
            return res.status(201).json(data)
        })



    })

}