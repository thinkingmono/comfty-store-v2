//domain/.netlify/functions/create-payment-intent

//Configure dotenv dependencie to use environment variables.
require('dotenv').config();

//Pass stripe account secret key from env variables to stripe config.
const stripe = require('stripe')(process.env.REACT_APP_AUTH_STRIPE_SECRET_KEY);

//Netlify serveless function to create an stripe payment intent.
exports.handler = async function (event, context) {
    //Check if there's an event's body.
    if (event.body) {
        //Destructure cart, shipping_fee and total_amount from event body turned into Json object.
        const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
        //Log cart into console.
        console.log(cart);

        //Calculate total order amount adding shipping fee to cart total amount.
        const calculateOrderAmount = () => {
            return shipping_fee + total_amount;
        }

        //Try catch block to send request to stripe.
        try {
            //Send request to stripe with passing an object with order total amount and currency.
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd'
            })
            return {
                //Return an object turned into an string with clientSecret capture from stripe's paymentIntent
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
            }
        } catch (error) {
            return {
                //Return an object turned into a string with error message.
                statusCode: 200,
                body: JSON.stringify({ msg: error.message })
            }
        }
    }
    return {
        //Return default response if there's no body in event.
        statusCode: 200,
        body: 'Create Payment Intent'
    }
}