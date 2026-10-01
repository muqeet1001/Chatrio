const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
        ,required:true
    }
})

const Usermodel = mongoose.model('User',UserSchema)
module.exports = Usermodel //this is the model for the user collection in the database