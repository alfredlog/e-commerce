module.exports = (req,res,next)=>{
    const auth = req.headers.auth
    if(auth)
    {
        if(auth == process.env.MAILAUTH)
        {
            next()
        }
        else
        {
            const message = "Ihr Schlüssel der Erlaubnis stimmt nicht"
            res.status(401).json(message)
        }
    }
    else
    {
        const message = "Sie haben keinen Schlüssel der Erlaubnis, um diese Mails zu senden"
        res.status(401).json(message)
    }
}