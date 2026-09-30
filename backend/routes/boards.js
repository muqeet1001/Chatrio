const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware.js')
const OrganizationModel = require('../models/Organization.js')
const BoardModel = require('../models/Boards.js')

router.post('/organization/:organizationId/board',authMiddleware,async(req,res)=>{
    const {organizationId} = req.params
    const {name} = req.body
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    const board = await BoardModel.create({name,organization:organizationId})
    return res.json(board)
})
router.get('/organization/:organizationId/boards',authMiddleware,async(req,res)=>{
    const {organizationId} = req.params
    const boards = await BoardModel.find({organization:organizationId})
    return res.json(boards)
})
router.get('/organization/:organizationId/board/:boardId',authMiddleware,async(req,res)=>{
    const {organizationId,boardId} = req.params
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    const board = await BoardModel.findById(boardId)
    if (!board) {
        return res.send("no board with this id")
    }
    return res.json(board)
})
router.delete('/organization/:organizationId/board/:boardId',authMiddleware,async(req,res)=>{
    const {organizationId,boardId} = req.params
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    const board = await BoardModel.findByIdAndDelete(boardId)
    return res.json(board)
})
router.put('/organization/:organizationId/board/:boardId',authMiddleware,async(req,res)=>{
    const {organizationId,boardId} = req.params
    const {name} = req.body
    const organization = await OrganizationModel.findById(organizationId)
    if (!organization) {
        return res.send("no organization with this id")
    }
    if (organization.admin.toString() != req.userId) {
        return res.send("you are not allowed")
    }
    const board = await BoardModel.findById(boardId)
    if (!board) {
        return res.send("no board with this id")
    }
    board.name = name
    await board.save()
    return res.json(board)
})  
module.exports = router