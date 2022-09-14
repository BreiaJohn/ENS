require("dotenv").config()

const express= require('express')
const app = express()
app.use(express.json())
app.use(express.static("public"))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([[
1,  {priceInCents: 10000, name:'Lactation Consultation'}],
[2, {priceInCents: 10000, name:'Sleep Consultation'}],
[3, {priceInCents: 12000, name:'5 Support Calls'}],
[4, {priceInCents: 5000, name:'Registry Assistance'}],
[5, {priceInCents: 15000, name:'Newborn care Services'}]
])

app.post('/create-checkout-session', async(req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
            line_items: [
              {price: 'price_1LcCMgKyhCmQ6ilaR5AsyJON', quantity: 2},
            ],
            mode: 'payment',
          });

           res.json({ url: session.url })
    } catch (e) {
        res.status(500).json ({error: e.message});
    }
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     mode: "payment",
        //     line_items: req.body.items.map( item => {
        //         const storeItem = storeItems.get(item.id) 
        //         return {
        //             data: {
        //                 currency: 'usd',
        //                 product_data: {
        //                     name: storeItem.name
        //                 },
        //                 unit_amount: storeItems.priceInCents
        //             },
        //                 quantity: item.quantity
        //         }
        //     }),
           
        // })
    // res.json({ url: session.url })
    // } catch (e) {
    //     res.status(500).json ({error: e.message});
    // }
})

app.listen(3000)