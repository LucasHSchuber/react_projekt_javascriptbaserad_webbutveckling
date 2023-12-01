require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
// Use cors middleware
app.use(cors());

app.use(express.json())

const myCVRouter = require('./routes/router')
app.use('/courses', myCVRouter)


//connect to mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to Database"))
//start the server
app.listen(5000, () => console.log("Server Started"))