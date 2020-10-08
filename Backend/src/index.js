const express = require('express')

const mongoose = require('mongoose')

const app = express()

// BodyParser middleware
app.use(express.json({ limit: '50mb' }))

// Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader(
        'Access-Control-Allow-Origin',
        // 'http://localhost:8888'
        '*'
    )

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        // 'x-auth-token,content-type'
        '*'
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader(
        'Access-Control-Allow-Credentials',
        true
    )//??

    // Pass to next layer of middleware
    next()
})

// Db config
const db = require('./config/keys').mongoURI

// connect to Mongoose
mongoose.connect(db, {
    useNewUrlParser: true, //////  it uses to parse MongoDB connection strings
    useFindAndModify: false, ////// you can use findOneAndDelete, findOneAndUpdate & etc
    useCreateIndex: true, //////  making Mongoose use createIndex() instead. ???
    useUnifiedTopology: true, ////// introduced a significant refactor of how it handles monitoring all the servers in a replica set or shard cluster
})
    .then(() =>
        console.log('database connected')
    )
    .catch(err => {
        console.log(err)
    })

const port = 5000

app.listen(port, () =>
    console.log(`server start on port ${port}`)
)

// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// })

// use route
app.use('/api/auth', require('./Routers/Apis/Auth'))
// app.use('/api/auth', require('./Routers/Apis/User'))