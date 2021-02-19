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
            console.log(blog)

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

// deleteBlog, updateBlog, allBlog, singleBlog, listAllBlogTagsCategories

exports.allBlog = async (req, res) => {
    try {
        await Blog.find()
            .populate('tags', '_id name slug')
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title  slug excerpt categories tags postedBy createdAt updatedAt')
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                return res.status(400).json({

                    error: errorHandler(err)
                })

            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error , try again' })

    }
}
exports.deleteBlog = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase()
        await Blog.findOneAndDelete({ slug: slug }, (err, blog) => {
            if (err) {
                errorHandler(err)
            }
            return res.status(200).json({ message: 'BLog Deleted successfully' })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error , try again' })

    }
}
exports.updateBlog = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase()
        await Blog.findOne({ slug: slug }).exec((err, oldblog) => {
            if (err || !oldblog) {
                return res.status(400).json({
                    error: 'Blog not found '
                })
            }

            const form = new formidable.IncomingForm()
            form.keepExtension = true
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({

                        error: 'Image could not uploaded'
                    })
                }

                let slugBeforeMarge = oldblog.slug
                oldblog = _.merge(oldblog, fields)
                oldblog.slug = slugBeforeMarge

                const { body, desc, categories, tags } = fields

                if (body) {

                    oldblog.excerpt = smartTrim(body, 320, ' ', '...')
                    oldblog.desc = stripHtml(body.substring(0, 160))
                }


                if (categories) {

                    oldblog.catategories = catategories.split(',')

                }
                if (tags) {

                    oldblog.tags = tags.split(',')
                }


                if (files.photo) {
                    if (files.photo.size > 10000000) {
                        return res.status(400).json({
                            error: 'Image should be less the 1mb'
                        })
                    }

                    oldblog.photo.data = fs.readFileSync(files.photo.path)
                    oldblog.photo.contentType = files.photo.type
                }


                oldblog.save((err, data) => {
                    if (err) {
                        console.log(err)

                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }

                    return res.status(200).json(data)

                })



            })


        })

    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error , try again'
        })

    }
}
exports.singleBlog = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase()
        await Blog.findOne({ slug: slug })
            .populate('tags', '_id name slug')
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title  slug body mtitle mdesc categories tags postedBy createdAt updatedAt')
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                return res.status(400).json({
                    error: errorHandler(err)
                })

            })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error , try again' })

    }
}
exports.listAllBlogTagsCategories = async (req, res) => {
    try {
        let limit = req.body.limit ? parseInt(req.body.limit) : 10
        let skip = req.body.skip ? parseInt(req.body.skip) : 0

        let categories;
        let tags;
        let blogs;
        await Blog.find()
            .populate('tags', '_id name slug')
            .populate('categories', '_id name slug')
            .populate('postedBy', '_id name username profile')
            .sort({ 'createdAt': -1 })
            .limit(limit)
            .skip(skip)
            .select('_id title  slug excerpt categories tags postedBy createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({

                        error: errorHandler(err)
                    })
                }
                blogs = data
                Category.find({}).exec((err, c) => {
                    if (err) {
                        return res.status(400).json({

                            error: errorHandler(err)
                        })
                    }
                    categories = c

                    Tags.find({}).exec((err, t) => {
                        if (err) {
                            return res.status(400).json({

                                error: errorHandler(err)
                            })
                        }
                        tags = t
                        res.status(200).json({ blogs, categories, tags, size: blogs.length })

                    })
                })



            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error , try again' })

    }
}
exports.blogPhoto = async (req, res) => {
    const slug = req.params.slug.toLowerCase()
    await Blog.findOne({ slug }).select('photo').exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({ error: errorHandler(err) })
        }
        res.set('Content-Type', data.photo.contentType)
        return res.status(200).send(data.photo.data)
    })
}