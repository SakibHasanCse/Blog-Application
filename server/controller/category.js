const Category = require('../models/category')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandel')

exports.createCategory = async (req, res, next) => {
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

exports.list = async (req, res) => {
    try {
        await Category.find(
            (err, data) => {
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

exports.read = async (req, res) => {
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

exports.deleteCategory = async (req, res) => {
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

