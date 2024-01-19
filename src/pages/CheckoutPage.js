import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

//Checkout page
const CheckoutPage = () => {
  //Destructure cart from cart context
  const { cart } = useCartContext();

  return <main>
    {/* Breadcrumb */}
    <PageHero title='Checkout' />
    <Wrapper className='page'>
      {/* If cart is empty render a message in the screen. If not render stripe checkout form */}
      {cart.length < 1 ? <div className='empty'>
        <h2>Your cart is empty</h2>
        <Link to='/products' className='btn'>Fill it</Link>
      </div> : <StripeCheckout />}
    </Wrapper>
  </main>
}

//Component style
const Wrapper = styled.div`
display: flex; 
align-items: center;
justify-content: center;
.empty{
  text-align: center
}
`
export default CheckoutPage
