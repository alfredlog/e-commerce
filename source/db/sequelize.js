const {Sequelize, DataTypes} = require("sequelize")
const artikels = require("../models/articles")
const admin = require("../models/admin")
require("dotenv").config()


const Db = new Sequelize(process.env.POSTGRES_URLV_URL)
const articles = artikels(Db, DataTypes)
const admins = admin(Db, DataTypes)
const sync = ()=>{
    Db.sync({force: true})
     .then(()=>{
      console.log("connecter")
 })
} 

 module.exports = {sync, admins, articles}