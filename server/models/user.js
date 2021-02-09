const mongoose = require('mongoose')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true,
        lowercase: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true,
        lowercase: true,
    },
    profile: {
        type: String,
        required: true,
    },
    hash_password: {
        type: String,
        required: true,
    }
    , role: {
        type: Number,
        trim: true,
    },
    salt: String,
    about: {
        type: String,
    },
    photo: {
        data: Buffer,
        ContentType: String,
    },
    resetPoasswordLink: {
        data: String,
        default: ''
    }



}, { timestamps: true })
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hash_password = this.makeEncryptPassword(password)
    })
    .get(function () {
        return this._password;

    })

userSchema.methods = {
    authonticate: function (plainText) {
        return this.makeEncryptPassword(plainText) === this.hash_password

    },
    makeEncryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')



        } catch (e) {
            return ''

        }

    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}


module.exports = User = mongoose.model('user', userSchema)