const mailauth = require("../../auth/mailauth")
const mailer = require("nodemailer")
const fs  = require("fs")
const path = require("path")
require("../../public/")
require("dotenv").config()
const transporter = mailer.createTransport({
    service : "gmail",
    user : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth:
    {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
})
const sendmail = (app)=>{
    app.post("/mailnotification",mailauth,(req,res)=>{

        const options = {
            from : process.env.MAIL,
            to : req.body.mail,
            subject : req.body.subject,
            text : req.body.text,
            attachments :[{
                filename : "fred.jpeg",
                path : "./public/1705757486645_OIP.jpeg"
            }] 
            
        }
        transporter.sendMail(options, (err, info)=>{
            if(err)
            {
                res.status(500).json(err)
            }
            else if(info)
            {
                const message = "Your email has been sent successfully"
                res.status(200).json({message,info})
            }
        })
    })
}

module.exports = {sendmail}