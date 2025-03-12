const createError = require('../utils/createError')
const jwt = require('jsonwebtoken')

exports.authCheck = async (req,res,next)=>{
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            return createError(404, "Missing Token!!")
        }
        const token = authorization.split(" ")[1]

        jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
            if(err){
                return createError(401, "Unauthorized!!")
            }
            console.log(decode);
            req.user = decode
            next()
        })

    } catch (error) {
        next(error)
    }
}