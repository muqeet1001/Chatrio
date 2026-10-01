const mongoose = require('mongoose')
const {Schema} = mongoose

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    }
})

const IssueModel = mongoose.model('Issue', IssueSchema)

module.exports = IssueModel