const express = require("express")
const app = express()
const {sendmail} = require("./routes/mails/admin")
require("dotenv").config()
const {artikeladden} = require("./routes/articlesadmin/artikeladden")
const mailer = require("nodemailer")
const body_parser = require("body-parser")
const {sync, admins} = require("./source/db/sequelize")
sync()


app.set("view engine","ejs")
app.use(express.static("public"))
require("./routes/Bezahlung/webhook")(app)
app.use(body_parser.json())
app.listen(4242, ()=>{console.log("l'application tourne sur http://Localhost:"+4242)})
require("./routes/anmeldung")(app)
require("./routes/verbiden")(app)
artikeladden(app)
sendmail(app)
require("./routes/articlesadmin/verändern")(app)
require("./routes/articlesadmin/EinenArtikelErhalten")(app)
require("./routes/articlesadmin/EinenArtikelLöchen")(app)
require("./routes/articlesadmin/artikel")(app)
require("./routes/AlleArtikelnErhalten")(app)
require("./routes/articlesadmin/Bildverändern")(app)
require("./routes/AdminÄndern/InformationenÄndern")(app)
require("./routes/AdminÄndern/passwortändern")(app)
require("./routes/Bezahlung/checkout")(app)

const {BildAdminUpload} = require("./routes/AdminÄndern/BildÄndern")
BildAdminUpload(app)

app.use((req,res)=>{res.status(404).json("Diese Seite existiert nicht ")})