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
        required: true,
    },
    salt: Number,
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
        this.hash_password = this.makeEncryptPassword()
    })
    .get(function () {
        return this._password;

    })

userSchema.methods =


    module.export = mongoose.model('User', userSchema)