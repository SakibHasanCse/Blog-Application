const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
    app.use(cors({ origin: process.env.CLIENT_URL }))

}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ time: new Date().toString() })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('listening on port' + port)
})