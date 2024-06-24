const bcrypt = require("bcrypt")
const auth = require("../../auth/auth")
const {admins} = require("../../source/db/sequelize")
const { ValidationError } = require("sequelize")

module.exports = (app)=>{
    app.put("/admin/:id/personalinfo/password", auth, (req,res)=>{
        const altpasswort = req.body.altepasswort
        const neupasswort = req.body.neuepasswort
        const id = req.params.id
        admins.findByPk(id)
         .then(admin =>{
            bcrypt.compare(altpasswort, admin.passwort)
             .then(richtig=>{
                if(richtig)
                {
                    
                    bcrypt.hash(neupasswort, 10)
                     .then((pass)=>{
                        admins.update({passwort : pass}, {where: {id: id}})
                         .then(()=>{
                            const message = "Das passwort wurde erfolgreich geändert"
                            res.status(200).json(message, admin)
                         })
                     })
                }
                else
                {
                    const message = "Das alte Passwort stimmt nicht"
                    res.status(400).json(message)
                }
             })
         })
         .catch(fehler=>{
            if(fehler)
            {
                res.status(400).json(fehler)
            }
            else
            {
                const message = "Es gibt ein Problem des Servers! Bitte versuch später erneut"
            }
         })
    })
}