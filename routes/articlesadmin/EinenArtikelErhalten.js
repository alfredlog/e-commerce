const auth = require("../../auth/auth")
const { admins } = require("../../source/db/sequelize")
const {articles} = require("../../source/db/sequelize")

module.exports = (app) =>{
    app.get("/admin/:id/articles/:idart", auth, (req,res)=>{
        const idamin = req.params.id
        const idart = req.params.idart
        admins.findByPk(idamin)
         .then(admin =>{
            articles.findOne({where:{id : idart, Geschäft : admin.geschäft}})
             .then(article =>{
               if(article)
               {
                  const message = "Der Artikel wird erfolgreich gefunden"
                  res.status(200).json(message, article)
               }
               else
               {
                  const message = "es gibt keinen Arkikel mit diesen informationen"
                  res.status(200).json(message)
               }
             })
         })
         .catch(Fehler =>{
            const message = "Serverfehler, Versuchen spät bitte"
            res.status(500).json(message, Fehler)
         })
    })
}