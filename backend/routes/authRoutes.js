const express = require('express')
const router = express.Router()
const Usermodel = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const userExists = await Usermodel.findOne({ username })

    if (userExists) {
        return res.json({
            msg: "this usernaem already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await Usermodel.create({ username, password:hashedPassword })
    return res.json({
        msg: "user created succesfully"
    })
})

router.post('/signin', async (req,res)=>{
    const {username,password} = req.body
    const userExists = await Usermodel.findOne({username})
    if (!userExists){
        return res.json({
            msg:"no username exists neeed to signup"
        })
    }
    const correctPassword = await bcrypt.compare(password,userExists.password)
    if (!correctPassword){
        return res.json({
            msg:"wrong password"
        })
    }
    const token = jwt.sign(
        { userId: userExists._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    res.cookie('token', token, {
        httpOnly: true,
        secure: false
    })
    return res.json({
        msg:"loggin succesfully"
    })
})
module.exports = router