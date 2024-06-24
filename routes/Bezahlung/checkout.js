const{articles} = require("../../source/db/sequelize")

require("dotenv").config()
const stripe = require("stripe")(process.env.PRIVATE_KEY)

module.exports = (app)=>{
    app.get("/checkout", async(req,res)=>{
        const artikellist = req.body.artikeln
        console.log(artikellist)
        try
        {
           await articles.findAll()
             .then(async(Artikeln) =>{
                const session = await stripe.checkout.sessions.create({
                    shipping_address_collection:{
                        allowed_countries:['US', 'CA', 'FR', 'DE', 'CD'],
                      },
                      shipping_options:[
                        {
                          shipping_rate_data:{
                            type: 'fixed_amount',
                            fixed_amount:{
                              amount : 2000,
                              currency: "usd",
                            },
                            display_name: 'Next day air',
                            delivery_estimate:{
                              minimum:{
                                unit : 'business_day',
                                value: 1,
                              },
                              maximum:{
                                unit: "business_day",
                                value: 1
                              }
                            }
                          }
                        },
                        {
                          shipping_rate_data:{
                            type: 'fixed_amount',
                            fixed_amount:{
                              amount : 0,
                              currency: "usd",
                            },
                            display_name: 'GRATUIT',
                            delivery_estimate:{
                              minimum:{
                                unit : 'business_day',
                                value: 5,
                              },
                              maximum:{
                                unit: "business_day",
                                value: 7
                              }
                            }
                          }
                        }
                      ],
                    line_items: artikellist.map(info=>{
                        var art = Artikeln.find(ar => ar.id == info.id)
                        return {
                            price_data : {
                                currency : "usd",
                                product_data :{
                                    name : art.name,
                                    description: art.Geschäft
                                },
                                unit_amount : art.preis * 100
                            },
                            quantity : info.q,
                        }
                    }),
                    mode: 'payment',
                    success_url:'http://localhost:2000/success.html',
                    cancel_url:'http://localhost:2000/cancel.html',
                })
                res.status(200).json({url: session.url})
             })
        }
        catch(b)
        {
            console.log(b)
            res.status(500).json({b})
        }
    })
}
