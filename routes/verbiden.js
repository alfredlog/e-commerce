const {admins} = require("../source/db/sequelize")
const bcrypt = require("bcrypt")
const key = require("../auth/key")
const jt = require("jsonwebtoken")
module.exports = (app)=> {
    app.post("/admin",(req,res)=>{
        
        admins.findOne({where : {email : req.body.email}})
         .then(admin=>{
            if(admin)
            {
                console.log(admin.passwort, req.body.passwort)
                bcrypt.compare(req.body.passwort, admin.passwort)
                 .then(isPasswordValide => {
                    console.log(isPasswordValide)
                    if(isPasswordValide)
                    {
                        const token = jt.sign({userId : admin.id},key,{expiresIn:"24h"})
                        const message = "der benutzer wurde erflogreich eingeloggt "
                        res.status(200).json({token, message})
                        console.log(token)
                    }
                    else
                    {
                        const message = "das passwort stimmt nicht"
                        res.status(401).json({message})
                    }
                 })
                 .catch(er =>{console.log(er)})
            }
            else
            res.status(401).json({nachrite : "es gibt keinen benutzer mit dieser adresse mail"})
         })
    })
}