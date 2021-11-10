const jwt = require("jsonwebtoken")

const auth = async (req,res,next) =>{
    try{
        const token = req.headers['token']
        if(token){
            jwt.verify(token ,process.env.JWT_SECRET,(err,result)=>{
                if(err){
                    return res.status(403).json({
                        message : err.message, code : 403, data : {}
                    })    
                }
                if(result){
                    req.user = result.id
                    next()
                }
            })
        }
        else{
            res.send("plzzzz provide the token nigga!")
        }
    }
        catch (e) {
            return res.send(e.message)
        }
    }
    
    module.exports ={
        auth
    }