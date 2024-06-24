
const { ValidationError, UniqueConstraintError } = require("sequelize")
const auth = require("../../auth/auth")
const { admins } = require("../../source/db/sequelize")
const multer = require("multer")
const lagerung = multer.diskStorage({
    destination : (req, file, cb)=>{cb(null, "./public/AdminBild")},
    filename : (req, file, cb)=>{cb(null, Date.now() + "_"+ file.originalname)}
})

const upload = multer({storage:lagerung})

BildAdminUpload = (app) =>{
    app.put("/admin/:id/personalInfo/Bild", auth, upload.single("bild"), (req, res)=>{
        const url = req.file.filename
        const id = req.params.id
        admins.update({bild : url}, {where :{id: id}})
         .then(()=>{
            admins.findByPk(id)
             .then(admin =>{
                const message = "Das Bild des Admins wird erfolgreich geändert"
                res.status(200).json({message, admin})
             })
             .catch(fehler =>{
                if(fehler)
                {
                    if(fehler instanceof ValidationError || fehler instanceof UniqueConstraintError)
                    {
                        res.status(400).json(fehler)
                    }
                    else
                    {
                        res.status(500).json(fehler)
                    }
                }
                else
                {
                    const message = "Fehler des Servers! versuche später erneut bitte"
                    res.status(500).json(message)
                }
             })
         })
    })
}

module.exports = {BildAdminUpload}