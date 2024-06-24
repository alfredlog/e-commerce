const bcrypte = require("bcrypt")
const {admins} = require("../source/db/sequelize")
const { ValidationError, UniqueConstraintError } = require("sequelize")
module.exports = (app)=>
{
    app.post("/logup", (req, res)=>
    {
        bcrypte.hash(req.body.passwort, 10)
         .then(hash => {
            admins.create({          
                name : req.body.name,
                passwort : hash,
                email : req.body.email,
                beschreibung : req.body.beschreibung,
                geschäft : req.body.geschäft,
                bild : "",
                sold : 0

        })
         .then(admin => {
            const message = "Der administrator wurde erfolgreich angemelden"
            res.json({message, admin})
         })
         .catch(fehler =>{
            if(fehler instanceof ValidationError)
            {
                res.status(400).json(fehler)
            }
            else if(fehler instanceof UniqueConstraintError)
            {
                res.status(400).json(fehler)
            }
            else
            {
                res.status(500).json(fehler)
            }
         })
    })  
    })
}