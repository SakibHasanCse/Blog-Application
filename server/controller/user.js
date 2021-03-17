const User = require('../models/user')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const expressJTW = require('express-jwt')
const Blog = require('../models/blogs')
const { errorHandler } = require('../helpers/dbErrorHandel')

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
            .select('_id name  username').exec((err, userData) => {
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