const auth = require("../../auth/auth")
const { articles } = require("../../source/db/sequelize")

module.exports = (app) =>{
    app.delete("/admin/:id/articles/:idart",auth, (req,res)=>{
        const idart = req.params.idart
        const id = req.params.id
        articles.findByPk(idart)
         .then(article =>{
            if(article)
            {
                articles.destroy({where : {id : idart}})
                 .then(()=>{
                    const message = `Der Artikel ${article.name}, der ${idart} als id hat, wurde erfolgreich gelöcht`
                    res.status(200).json({message, article})
                 })
            }
            else
            {
                const message = `Es gibt keinen Artikel, der ${idart} als id hat`
                res.status(200).json({message, article}) 
            }
         })
         .catch(fehler =>{
            res.status(200).json(fehler) 
         })
    })
}