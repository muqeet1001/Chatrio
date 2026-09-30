const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const OrganizationModel = mongoose.model('Organization', organizationSchema)

module.exports = OrganizationModel