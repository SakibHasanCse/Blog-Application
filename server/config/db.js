const mongoose = require('mongoose')

exports.databaseConnection = (url) => {
    mongoose.connect(url, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
        .then((result) => {
            console.log('Database Connected')
        })
        .catch((error) => {
            console.log('Database Connection faild')
            console.log(error)
        })

}