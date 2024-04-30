import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

//loadStripe with stripe's account public key and store it into a promise const.
const promise = loadStripe(process.env.REACT_APP_AUTH_STRIPE_PUBLIC_KEY);

//Checkout form component.
const CheckoutForm = () => {
  //Destructure cart, total_amount, shipping_fee and clearCart from cart context.
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  //Destructure myUser from user context.
  const { myUser } = useUserContext();
  //navigate declaration using useNavigate hook
  const navigate = useNavigate();

  //Stripe values declaration as a state variables.
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  //Function to send request to serverless function and set client secret token.
  const createPaymentIntent = async () => {
    try {
      //Send post request using axios. Send to create payment intent function and pass cart, shipping_fee and total_amout gather in an object turned into a string. Store response and destructure data from stripe
      const { data } = await axios.post('/.netlify/functions/create-payment-intent', JSON.stringify({ cart, shipping_fee, total_amount }));
      // console.log(data.clientSecret);
      //Set client secret token with the one destructure from response.
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.message);
    }
  }

  //Run createPaymentIntent function when page loads.
  useEffect(() => {
    createPaymentIntent();
    //eslint-disable-next-line
  }, [])

  //Handle stripe checkout fields change.
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  }

  //Handle stripe checkout submit
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    //Send request to stripe to confirma card payment. Pass client secret token return from create payment intent and stripe's Card Element wich has credit card info.
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    })

    //If there's an error in payload. throw error message. If there's no error set stripe states, clear cart and navigate to home.
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000)
    }
  }

  //Checkout form style.
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return <div>
    {/* If transaction succeeded render thank you message. If not show checkout info to pay*/}
    {succeeded ?
      //Thank you message
      <article>
        <h4>Thank you!</h4>
        <h4>Your payment was successful!</h4>
        <h4>Redirecting to home page shortly</h4>
      </article> :
      //Checkout information to pay
      <article>
        <h4>Hello, {myUser && myUser.name}</h4>
        <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
        <p>Test Card Number: 4242 4242 4242 4242</p>
      </article>}
    {/* Stripe form */}
    <form id='payment-form' onSubmit={handleSubmit}>
      {/* Stripes Card Field */}
      <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
      {/* Pay button */}
      <button disabled={processing || disabled || succeeded} id='submit'>
        <span id='button-text'>
          {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
        </span>
      </button>
      {/* If there's an error display error message */}
      {error && <div className='card-error' role='alert'>{error}</div>}
      {/* If transaction suceeded show result message with link to stripe panel. if not hide it. */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>Payment succeeded, see the result in your
        <a href="https://dashboard.stripe.com/test/payments" target='_blank'> Stripe dashboard </a>
        Refresh the page to pay again
      </p>
    </form>
  </div>
}

//Stripe Checkout Component. Render stripe Elements component wrapping CheckoutForm. Pass promise with public key into stripe prop.
const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  )
}

//Component style
const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`

export default StripeCheckout
