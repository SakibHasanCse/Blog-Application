const User = require('../models/user')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const expressJTW = require('express-jwt')
const Blog = require('../models/blogs')
const { errorHandler } = require('../helpers/dbErrorHandel')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs')

exports.read = (req, res) => {
    req.profile.hash_password = undefined;
    return res.json(req.profile)
}

exports.userwithBlogs = async(req, res) => {
    try {
        const username = req.params.username
        let user;
        console.log(username)
        await User.findOne({ username: username })
            .select('_id name  username profile createdAt').exec((err, userData) => {
                if (err || !userData) {
                    console.log(err)
                    return res.json({ error: 'User not found' })
                }

                user = userData
                let userId = userData._id
                console.log(userId)
                Blog.find({ postedBy: userId })
                    .populate('tags', '_id name slug')
                    .populate('categories', '_id name slug')
                    .populate('postedBy', '_id name')
                    .limit(10)
                    .select('_id title  slug excerpt categories tags postedBy createdAt updatedAt')
                    .exec((err, blogData) => {
                        if (err) {
                            console.log(err)

                            return res.json({ error: errorHandler(err) })
                        }

                        console.log({ user, blogs: blogData })
                        return res.status(200).json({ user, blogs: blogData })
                    })


            })

    } catch (error) {
        console.log(error)

        return res.json({ error: 'Somthing went wrong' })


    }
}

exports.userPhoto = async() => {
    try {
        const username = req.params.username
        await User.findOne({ username: username }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                })
            }
            if (user.photo.data) {
                res.set('Content-Type', user.photo.contentType)
                return res.send(user.photo.data)

            } else {
                return res.status(400).json({
                    error: 'Somthing went wrong'
                })
            }
        })
    } catch (error) {
        return res.status(400).json({
            error: errorHandler(err)
        })

    }


}
exports.updateUsers = (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            })
        }
        let user = req.profile
        user = _extend(user, fields)
        if (files.photo) {
            if (files.photo.size > 100000) {
                return res.status(400).json({
                    error: 'Photo size must be less than 1mb'
                })
            }

            user.photo.data = fs.file(files.photo.path)
            user.photo.contentType = files.photo.type
            user.save().then((data) => {
                user.hash_password = undefined
                return res.status(200).json(user)

            }).catch(err => {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            })
        }
    })
}