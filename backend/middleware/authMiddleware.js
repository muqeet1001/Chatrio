const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next)=>{
    const {token} = req.cookies
    try{
        const isvalide = await jwt.verify(token,process.env.JWT_SECRET)
        req.userId = isvalide.userId
    }catch(err){
        return res.json({
            msg:'not valide user'
        })
    }
     
    next()
}

module.exports = authMiddleware