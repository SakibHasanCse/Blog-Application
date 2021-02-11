

const Tags = require('../models/tags')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandel')

exports.createTags = async (req, res, next) => {
    try {
        const { name } = req.body
        const slug = slugify(name).toLowerCase()

        const newTags = new Tags({ name, slug })

        await newTags.save((err, data) => {
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

    }
}

exports.list = async (req, res) => {
    try {
        await Tags.find(
            (err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Tags Not Found'
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
        await Tags.findOne({ slug }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            if (!data) {
                return res.status(400).json({
                    error: 'Tags Not Found'
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

exports.deleteTags = async (req, res) => {
    const slug = req.params.slug
    try {
        await Tags.findOne({ slug }, (err, Tags) => {
            if (err || !Tags) {
                return res.status(400).json({
                    error: 'Tags Not Found'
                })
            }
            Tags.remove({ slug }, (err, data) => {
                return res.status(200)
                    .json({ message: 'Delete Tags Success' })
            })
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Somthing went wrong'
        })
    }
}
