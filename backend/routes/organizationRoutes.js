const express = require('express')
const router = express.Router()
const OrganizationModel = require('../models/Organization')
const authMiddleware = require('../middleware/authMiddleware')
const Usermodel = require('../models/User')

router.post('/organization', authMiddleware, async (req, res) => {
    const { name, title } = req.body
    const newOrg = {
        name, title, admin: req.userId
    }
    await OrganizationModel.create(newOrg)
    return res.json({
        msg: "new organization is created"
    })

})
router.get('/organization', authMiddleware, async (req, res) => {
    const userId = req.userId
    const Organizations = await OrganizationModel.find({ admin: userId })
    return res.json({
        Organizations
    })
})
router.get('/organization/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const org = await OrganizationModel.findById(id)

    if (!org) {
        return res.send("no organization with this id")
    }

    const isMember = org.members.some(
        member => member.toString() === userId
    )

    if (org.admin.toString() != userId && !isMember) {
        return res.send("you are not allowed")
    }

    return res.json(org)

})
router.delete('/organization/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    const org = await OrganizationModel.findById(id)
    if (!org) {
        return res.send("no organization with this id")
    }
    if (org.admin.toString() != userId) {
        return res.send("you are not allowed")
    }
    await OrganizationModel.findByIdAndDelete(id)
    return res.json({
        msg: "organization is deleted"
    })
})
router.post('/organization/add-member', authMiddleware,async (req, res) => {
    const { organizationId, memberId } = req.body
    const organization = await OrganizationModel.findById(organizationId)
    
    const member = await Usermodel.findById(memberId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    if (!member) {
        return res.send("no member with this id")
    }
    const isMember = organization.members.some(
        member => member.toString() === memberId
    )
    if (isMember) {
        return res.send("member is already in organization")
    }
    organization.members.push(memberId)
    await organization.save()   
    return res.json(organization)
})
router.post('/organization/remove-member', authMiddleware,async(req, res) => {
    const { organizationId, memberId } = req.body
    const organization = await OrganizationModel.findById(organizationId)
    const member = await Usermodel.findById(memberId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    if (!member) {
        return res.send("no member with this id")
    }
    const isMember = organization.members.some(
        member => member.toString() === memberId
    )
    if (!isMember) {
        return res.send("member is not in organization")
    }
    organization.members = organization.members.filter(
        member => member.toString() !== memberId
    )
    await organization.save()
    return res.json(organization)
})
module.exports = router