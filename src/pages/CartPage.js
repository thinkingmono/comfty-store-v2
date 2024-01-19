import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

//Cart Page.
const CartPage = () => {
  //Destructure cart from cart context
  const { cart } = useCartContext();
  //If there are no products in the cart return an empty message on screen
  if (cart.length < 1) {
    return <Wrapper className='page-100'>
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link to='/products' className='btn'>Fill it</Link>
      </div>
    </Wrapper>
  }
  return <main>
    {/* Breadcrumb */}
    <PageHero title='cart' />
    {/* Render Cart Content */}
    <Wrapper className='page'>
      <CartContent />
    </Wrapper>
  </main>
}

//Component style
const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
