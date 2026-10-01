const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const IssueModel = require('../models/Issue')
const router = express.Router()

router.post('/organization/:organizationId/board/:boardId/issue',authMiddleware,async(req,res)=>{
    const {organizationId,boardId} = req.params
    const {title,description,status} = req.body
    try {
        const issue = new IssueModel({title,description,status,board:boardId})
        await issue.save()
        res.status(201).json(issue)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
router.put('/organization/:organizationId/board/:boardId/issue/:issueId', authMiddleware, async (req, res) => {
    const {organizationId,boardId,issueId} = req.params
    const {status} = req.body
    try {
        const issue = await IssueModel.findByIdAndUpdate(issueId,{$set:{status}},{new:true})
        res.status(200).json(issue)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
router.delete('/organization/:organizationId/board/:boardId/issue/:issueId', authMiddleware, async (req, res) => {
    const {organizationId,boardId,issueId} = req.params
    try {
        await IssueModel.findByIdAndDelete(issueId)
        res.status(200).json({message: 'Issue deleted successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
module.exports = router