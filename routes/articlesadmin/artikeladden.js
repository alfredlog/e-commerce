const { admins } = require("../../source/db/sequelize")
const {articles} = require("../../source/db/sequelize")
const auth = require("../../auth/auth")
const {ValidationError , UniqueConstraintError} = require("sequelize")
const multer = require("multer")
const os = require("os")

const lagerung = multer.diskStorage({
    destination : (req, file, cb)=>{cb(null, `${os.homedir}`)},
    filename : (req, file, cb)=>{cb(null, Date.now() + "_"+ file.originalname)}
})

const upload = multer({storage:lagerung})

const artikeladden = (app)=> {
    app.post("/admin/:id/articles", auth, upload.single("bild"),(req, res)=>{
        const id = req.params.id
        admins.findByPk(id)
         .then(ad =>{
            if(ad)
            {
                articles.create({
                    name : req.body.name,
                    preis : req.body.preis,
                    Quantitat : req.body.Quantitat,
                    Geschäft : ad.geschäft,
                    Beschreibung : req.body.Beschreibung,
                    bild : req.file.filename
                })
                 .then(article =>{
                    const message = "Der Artikel wurde erfolgreich in Ihrem Geschäft geaddet"
                    res.status(200).json({message,article})
                 })
                 .catch(fehler=> {
                    if(fehler instanceof ValidationError)
                    {
                        res.status(400).json({message : fehler.message, fehler})
                    }
                    else if(fehler instanceof UniqueConstraintError)
                    {
                        res.status(400).json({message : fehler.message, fehler})
                    }
                    else
                    {
                        const message = "Der Artikel konnte nicht geaddet werden. Versuchen Sie spät bitte"
                        res.status(500).json({message,fehler})
                    }
                 })
            }
            else
            {
                const message =  `Es gibt keinen benutzer mit ${id} als id, also ist Ihr Antrag schlecht`
                res.status(400).json({message})
            }
         })
    })
}

module.exports = {artikeladden}