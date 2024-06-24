const { UniqueConstraintError, ValidationError } = require("sequelize")
const auth = require("../../auth/auth")
const multer = require("multer")
const { admins } = require("../../source/db/sequelize")
const {articles} = require("../../source/db/sequelize")
const fs = require("fs")

const disk = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "./public/")
    },
    filename : (req, file, cb)=>{
        cb(null, `${Date.now()}_ ${file.originalname}`)
    }
})

const m = multer({storage:disk})

module.exports = (app)=>{
    app.put("/admin/:id/articles/:idart/bild",auth, m.single("bild"), (req,res)=>{
        const id = req.params.idart
        articles.findByPk(id).then(artikelb =>{
            console.log(artikelb.bild)
            fs.unlink(`./public/${artikelb.bild}`, (fehler)=>{
                if(fehler)
                {
                    res.status(500).json(fehler)
                }
                else
                {
                    articles.update({bild : req.file.filename}, {where : {id : id}})
                     .then(()=>{
                        articles.findByPk(id)
                         .then(artikel =>{
                            const message = "Das Bild des artikels wurde erfolgreich geändert"
                            res.status(200).json({message, artikel})
                         })
                     })
                }
            })
         }).catch(fehler=>{
            if(fehler)
            {
                res.status(500).json(fehler)
            }
            else
            {
                const message = "Fehler des Servers! versuch später bitte"
                res.status(500).json(message)
            }
         })
    })
}