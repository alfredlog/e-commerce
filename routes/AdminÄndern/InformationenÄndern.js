const auth = require("../../auth/auth")
const {admins} = require("../../source/db/sequelize")
const bcrypt = require("bcrypt")

module.exports =  (app) => {
    app.put("/admin/:id/personalInfo", auth, (req, res)=>{
        const id = req.params.id
        const pass = req.headers.passwort
        admins.findByPk(id)
         .then(admin =>{
            await =  bcrypt.compare(pass, admin.passwort).then(b =>{
                console.log(b)
                if(b)
                {
                    admins.update(req.body, {where: {id : id}})
                     .then(()=>{
                        admins.findByPk(id)
                         .then(admin =>{
                            const message = "Der Admin wurde erfolgreich verändert"
                            res.status(200).json({message, admin})
                         })
                     })
                     .catch(((Fehler) =>{
                        if(Fehler)
                        {
                            res.status(404).json(Fehler)
                        }
                        else
                        {
                            const message = "Fehler des Server! versuchen Sie später bitte"
                            res.status(500).json(message)                           
                        }
                     }))
                }
                else
                {
                    const message = "Ihr Passwort stimmt nicht"
                    res.status(401).json(message)
                }

            })

         })
    })
}