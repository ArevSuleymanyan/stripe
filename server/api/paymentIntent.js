const stripeAPI = require('../stripe/index')

function calculateOrderAmount(product){
    return product.price * product.quantity * 100
}


async function paymentIntent(req , res){
    const { product, receipt_email, shipping} = req.body || {}

    let paymentIntent;

    try {
        paymentIntent = await stripeAPI.paymentIntents.create({
            amount: calculateOrderAmount(product),
            currency: 'usd',
            payment_method_types:['card'],
            receipt_email,
            shipping
        })

        res.status(200).json({clientSecret: paymentIntent.client_secret})
    }catch (e) {
        console.log(e.message)
        res.status(400).json({error: 'error from paymentIntent'})
    }
}
module.exports = paymentIntent
