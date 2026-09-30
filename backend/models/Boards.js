const mongoose = require('mongoose')
const {Schema} = mongoose
const boardSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
})
const BoardModel = mongoose.model('Board', boardSchema)
module.exports = BoardModel