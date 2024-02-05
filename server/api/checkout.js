const stripeAPI = require('../stripe/index')


async function createStripeCheckoutSession(req , res){
    const domainURL = process.env.WEB_APP_URL
    const { line_items, customer_email} = req.body || {}
    if(!line_items || !customer_email){
        return res.status(400).json({error: 'missing parameters'})
    }
    let session;

    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/canceled`,
            shipping_address_collection: {allowed_countries: ['US']}
        })

        res.status(200).json({sessionId: session.id})
    }catch (e) {
        console.log(e.message)
        res.status(400).json({error: 'error from createStripeCheckoutSession '})
    }
}
module.exports = createStripeCheckoutSession
