require('dotenv').config()
const express = require('express')
const connectdb = require('./db.js')
const Usermodel = require('./models/User.js')
const router = require('./routes/authRoutes.js')
const cookieParser = require('cookie-parser')

 
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/auth',router)
app.listen(3000,()=>{
    connectdb()
    console.log("Chatrio backend is running");
})