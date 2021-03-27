const Category = require('../models/category')
const Blog = require('../models/blogs')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandel')

exports.createCategory = async(req, res, next) => {
    try {
        const { name } = req.body
        const slug = slugify(name).toLowerCase()



        const newCategory = new Category({ name, slug })

        await newCategory.save((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            return res.status(201)
                .json(data)
        })


    } catch (error) {

        error: errorHandler(err)



    }
}

exports.list = async(req, res) => {
    try {
        await Category.find()
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Category Not Found'
                    })
                }
                return res.status(200)
                    .json(data)
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Somthing went wrong'
        })
    }
}

exports.read = async(req, res) => {
    const slug = req.params.slug
    try {
        await Category.findOne({ slug }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            if (!data) {
                return res.status(400).json({
                    error: 'Category Not Found'
                })
            } else {
                Blog.find({ categories: data })
                    .populate('categories', '_id name slug')
                    .populate('tags', '_id name slug')
                    .populate('postedBy', '_id name')
                    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
                    .exec((err, result) => {
                        console.log({ category: data, blogs: result })
                        return res.status(200).json({ category: data, blogs: result })
                    })

            }
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Somthing went wrong'
        })
    }
}

exports.deleteCategory = async(req, res) => {
    const slug = req.params.slug
    try {
        await Category.findOne({ slug }, (err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: 'Category Not Found'
                })
            }
            Category.remove({ slug }, (err, data) => {
                return res.status(200)
                    .json({ message: 'Delete Category Success' })
            })
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Somthing went wrong'
        })
    }
}