const auth = require("../../auth/auth")
const { admins } = require("../../source/db/sequelize")
const {articles} = require("../../source/db/sequelize")

module.exports = (app)=>{
    app.get("/admin/:id/articles", auth, (req,res)=>{
        const id = req.params.id
        admins.findByPk(id)
         .then(admin =>{
            articles.findAll({where:{Geschäft : admin.geschäft}})
             .then(artikels =>{
                res.status(200).json({admin, artikels})
             })
         })
    })
}