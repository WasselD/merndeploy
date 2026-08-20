const jwt = require("jsonwebtoken")
const User = require("../models/User")

const isAuth = async(req, res, next)=>{
    try{
        const token = req.header("Authorization")
        if(!token)
            return res.status(401).json({message : "no token authorization denied"})

        const decode = jwt.verify(token , process.env.SECRET_KEY)
        const foundUser = await User.findById(decode.id)
        if(!foundUser)
            return res.status(401).json({message : "user not authorized"})
        req.user = foundUser
        next()
    }
    catch(error){
        res.status(401).json({message : "token is not valid"})
    }
}

module.exports = isAuth