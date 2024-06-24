const { articles } = require("../source/db/sequelize")
const { Op } = require("sequelize")
module.exports = (app)=>{
    app.get("/", (req,res)=>{
        if(req.query.name || req.query.quantite)
        {
            const name = req.query.name || ""
            const Q = req.query.quantite || ""
            const G = req.query.magasin || ""
            const PI = req.query.prixinf || 100000000000000
            const PS = req.query.prixsup || 0
            console.log(Q)
            articles.findAndCountAll({where:{[Op.or]:[{name : {[Op.like]: `%${name}%`}},{Beschreibung : {[Op.like]: `%${name}%`}}],  Geschäft : {[Op.like]:`%${G}%`}, preis : {[Op.between]: [PS, PI]} },
            order : [["name", "DESC"]]
        }).then((artikeln, count)=>{
            if(artikeln.count > 1)
            {
                const message = `${artikeln.count} Artikeln wurden erfolgreich gefunden`
                res.status(200).json({message, artikeln : artikeln.rows})
            }
            else if(artikeln.count == 1)
            {
                const message = `${artikeln.count} Artikeln wurden erfolgreich gefunden`
                res.status(200).json({message, artikeln : artikeln.rows})
            }
            else
            {
                const message = `keiner Artikel wird gefunden`
                res.status(200).json({message}) 
            }
        }).catch()
        }
        else
        {
           articles.findAndCountAll()
             .then((artikeln)=>{
               if(artikeln.count > 1)
               {
                   const message = `${artikeln.count} Artikeln wurden erfolgreich gefunden`
                   res.status(200).json({message, artikeln : artikeln.rows})
               }
               else if(artikeln.count == 1)
               {
                  const message = `${artikeln.count} Artikeln wurden erfolgreich gefunden`
                  res.status(200).json({message, artikeln : artikeln.rows})
               }
               else
               {
                   const message = `keiner Artikel wird gefunden`
                   res.status(200).json({message}) 
               }
         })
        }
    })
}