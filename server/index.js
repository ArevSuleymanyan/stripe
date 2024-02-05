const express = require('express')
const cors = require('cors')
require('dotenv').config({path:'./.env'})
const createStripeCheckoutSession = require("./api/checkout");
const paymentIntent = require("./api/paymentIntent");


const app = express()
app.use(express.json())
app.use(cors({origin:true}))

app.post('/create-checkout-session', createStripeCheckoutSession) //for stripe checkout
app.post('/create-payment-intent', paymentIntent) //for custom checkout

app.listen(process.env.PORT, () => {
    console.log('Server is connected')
})

