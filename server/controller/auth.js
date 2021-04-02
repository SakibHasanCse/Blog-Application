const User = require('../models/user')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
var expressJTW = require('express-jwt')

const Blog = require('../models/blogs')
const { errorHandler } = require('../helpers/dbErrorHandel')

const sgMail = require('@sendgrid/mail') //SEND GRID API
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.Signup = async(req, res, next) => {

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



exports.Signin = async(req, res, next) => {
    const { password, email } = req.body
    console.log(password)
    await User.findOne({ "email": email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User Not Found with this email' })

        }
        if (!user.authonticate(password)) {
            return res.status(400).json({ error: 'Email and password are not match' })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '1m' })
        res.cookie("token", token, { expiresIn: '1m' })

        const { _id, email, name, username, role } = user

        return res.status(200).json({
            user: { _id, email, name, username, role },
            token
        })
    })


}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message: 'Logout Successfully'
    })
}

exports.ForgetPassword = (req, res) => {
    const { email } = req.body
    User.findOne({ email: email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found with this email'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_TOKEN, { expiresIn: '10m' })

        const msg = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <h4>Please use the  following link to reset your password</h4>
            <p><a className="btn btn-info" href="${process.env.CLIENT_URL}/auth/password/rest/${token}" >Reset Password</a></p>
           
            <hr />
            <p>This email may contact sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>
            `
        }

        user.updateOne({ resetPasswordLink: token }, (err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            sgMail.send(msg).then(() => {
                return res.status(200).json({ message: `Email has been sent to ${email} .Follow the instruction to reset password .Link expires in 10min.` })
            }, error => {
                if (error.response) {

                    return res.status(400).json({ error: error.response.body.errors[0].message })
                } else {
                    return res.status(400).json({ error: 'Internal server error , try again' })
                }


            })
        })


    })



}
exports.ResetPassword = (req, res) => {

}

exports.authUserMiddleware = async(req, res, next) => {
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

exports.authAdminMiddleware = async(req, res, next) => {
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

exports.authUserMiddleware = async(req, res, next) => {
    const UserID = req.user._id
    await await User.findOne({ _id: UserID }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
        if (user.role !== 0) {
            return res.status(400).json({
                error: 'User Access denied'
            })
        }
        req.profile = user
        next()

    })
}


exports.requireSignin =
    expressJTW({ secret: process.env.JWT_TOKEN, algorithms: ['HS256'] }),
    (err, req, res, next) => {
        console.log(err)
    }


exports.doUpdateAndDelete = (req, res, next) => {
    const slug = req.params.slug
    Blog.findOne({ slug: slug }).exec((err, blog) => {
        if (err || !blog) {
            res.status(200).json({
                error: errorHandler(err)
            })
        }
        const authorized = blog.postedBy._id.toString() === req.profile._id.toString()
        if (authorized) {
            next()
        } else {
            res.json({
                error: 'Unauthorized User'
            })
        }
    })
}