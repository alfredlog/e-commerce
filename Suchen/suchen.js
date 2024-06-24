const { articles } = require("../source/db/sequelize")
const { Op } = require("sequelize")
module.exports = (name, preise) =>{
    articles.findAndCountAll({where:{}})
}