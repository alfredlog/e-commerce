require("dotenv").config()
const {option1, option2} = require("./options")
const {admins} = require("../../source/db/sequelize")
const stripe = require("stripe")(process.env.PRIVATE_KEY)
const express = require("express")
const mailer = require("nodemailer")

const transporter = mailer.createTransport({
    service : "gmail",
    user : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth:
    {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
})
module.exports = (app)=>{
  app.post("/webhook",express.raw({type: 'application/json'}),async (req, res)=>{
    const sig = req.headers['stripe-signature'];
    const body = req.body
    const e = "whsec_42217db53e44360e2316060fdaf5b4fa8dc894da74ed08d93215e94fd0694c01"
    let event 
    try {
        event = stripe.webhooks.constructEvent((body.toString()), sig, e)
    } catch (error) {
        res.status(400).send(error)
        return
    }
    if(event.type == "checkout.session.completed")
    {
        const kunde = event.data.object.customer_details
        const mail = kunde.email
        const Betrag = event.data.object.amount_total
        const adresse = `${kunde.address.country}, ${kunde.address.city}, ${kunde.address.line1}, Postleitzahl: ${kunde.address.postal_code || ""}`
        const artikel = event.data.metadata || "schuhe"
        const livraison = event.shipping_options
        const kaufer = option1(Betrag,mail,adresse,artikel,livraison)
        const verkaufer = option2(Betrag, "alfred.dev.web@gmail.com",adresse, artikel,mail,livraison)
        await transporter.sendMail(kaufer, (err)=>{
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log("Die mail wurde erfolgreich an den Kaufer gesendet")
            }
        })
        await transporter.sendMail(verkaufer, (err)=>{
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log("Die mail wurde erfolgreich an den Kaufer gesendet")
            }
        })
        res.status(200).json(kunde)
    }

})
}