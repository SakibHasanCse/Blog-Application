
const User = require('../models/user')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const expressJTW = require('express-jwt')



exports.Signup = async (req, res, next) => {

    try {
        await User.findOne({ "email": req.body.email }).exec((err, user) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: err })
            }
            if (user) {
                return res.status(400).json({ error: 'User already exists with this email' })
            }
            const { email, password, name } = req.body
            const username = shortid.generate()
            const profile = `${process.env.CLIENT_URL}/profile/${username}`

            const newUser = new User({ email, password, name, username, profile })

            newUser.save((err, success) => {
                if (err) {


                    return res.status(400).json({ error: err })
                }
                return res.status(201).json({ message: 'Signup Created successfully', data: success })
            })

        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Somthing went wrong ,Try agin' })


    }
}

exports.Signin = async (req, res, next) => {
    const { password, email } = req.body
    console.log(password)
    await User.findOne({ "email": email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User Not Found with this email' })

        }
        if (!user.authonticate(password)) {
            return res.status(400).json({ error: 'Email and password are not match' })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '1d' })
        res.cookie("token", token, { expiresIn: '1d' })

        const { _id, email, name, username, role } = user

        return res.status(200).json({
            user: { _id, email, name, username, role }
            , token
        })
    })


}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: 'Logout Successfully'
    })
}

exports.authUserMiddleware = async (req, res, next) => {
    const userID = req.user._id
    await await User.findOne({ _id: userID }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        req.profile = user
        next()

    })

}

exports.authAdminMiddleware = async (req, res, next) => {
    const adminID = req.user._id
    await await User.findOne({ _id: adminID }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin Access denied'
            })
        }
        req.profile = user
        next()

    })

}

exports.requireSignin = expressJTW({ secret: process.env.JWT_TOKEN, algorithms: ['HS256'] }), (err, req, res, next) => {
    console.log(err)
}