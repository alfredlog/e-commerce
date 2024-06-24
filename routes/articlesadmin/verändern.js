const { UniqueConstraintError, ValidationError } = require("sequelize")
const auth = require("../../auth/auth")
const { admins } = require("../../source/db/sequelize")
const {articles} = require("../../source/db/sequelize")

module.exports = (app) =>{
    app.put("/admin/:id/articles/:idart/info", auth, (req,res)=>{
        articles.update(req.body, {where: {id : req.params.idart}})
         .then(() =>{
            articles.findByPk(req.params.idart)
             .then(article =>{
                if(article)
                {
                    const message = `Der artikel ${article.name}, der ${req.params.idart} als id hat, wurde erfolgreich verändert`
                    res.status(200).json({message, article})
                }
                else
                {
                    const message = `Es gibt keinen Artikel, der ${req.params.idart} als id hat`
                    res.status(400).json({message, article})
                }
             })
         })
         .catch(fehler =>{
            if(fehler instanceof UniqueConstraintError)
            {
                res.status(400).json(fehler)
            }
            else if(fehler instanceof ValidationError)
            {
                res.status(400).json(fehler)
            }
         })
    })
}