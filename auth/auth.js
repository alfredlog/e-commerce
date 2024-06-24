const key = require("../auth/key")
const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const authorizationHeade = req.headers.authorization
    const id = req.params.id
    console.log(req.body.name)
    if(authorizationHeade)
    {
        const token = authorizationHeade.split(" ")[1]
        const decodetoken = jwt.verify(token, key, (erreur, decodetoken)=>{
            if(decodetoken)
            {
                if(id && id != decodetoken.userId)
                {
                    const message = "Das Id stimmt nicht mit dem token"
                    res.status(401).json({message})
                }
                else
                {
                    next()
                }
            }
            else if(erreur)
            {
                const message = "Dein token stimmt nicht "
                res.status(401).json({message, erreur})
            }
        })
    }
    else
    {
        const message = "Sie haben kein authorization"
        res.status(401).json({message})
    }
}