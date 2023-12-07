require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')

// const bodyParser = require("body-parser");
// const { Configuration, OpenAIApi } = require("openai");
// const config = new Configuration({
//     apiKey: "",
// })

// Use cors middleware
app.use(cors());

app.use(express.json())


const AccountingRouter = require('./routes/accountingRoute')
app.use('/accountings', AccountingRouter)

const UserRouter = require('./routes/userRoute')
app.use('/users', UserRouter)

// const SearchRouter = require("./routes/searchRoute")
// app.use("/search", SearchRouter)


//connect to mongodb
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to Database"))
//start the server
const port = 5000;
app.listen(port, () => console.log("Server Started on port: " + port))