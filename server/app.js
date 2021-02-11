const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const { databaseConnection } = require('./config/db')


if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
    app.use(cors({ origin: process.env.CLIENT_URL }))

}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieparser())


const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category')
const TagsRouter = require('./routers/tags')


app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', categoryRouter)
app.use('/api', TagsRouter)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('listening on port' + port)
    const url = process.env.DBURL
    databaseConnection(url)
})