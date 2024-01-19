import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'

//Cart Content Component which renders cart products list, cart totals, clear cart button and back to products page button.
const CartContent = () => {
  //Destructure cart and clearCart from cart context.
  const { cart, clearCart } = useCartContext();

  return <Wrapper className='section section-center'>
    {/* Render cart products list table headers */}
    <CartColumns />
    {/* Map over cart to render each product from array. Each product renders as a CartItem component structure */}
    {cart.map((item) => {
      //Pass spread it product properties.
      return <CartItem key={item.id} {...item} />
    })}
    <hr />
    {/* Link container to render continue shopping and clear cart button */}
    <div className="link-container">
      {/* Continue shopping link to return to products page */}
      <Link to='/products' className='link-btn'>Continue shopping</Link>
      {/* Clear cart button to clear cart array an leave it empty. */}
      <button type="button" className='link-btn clear-btn' onClick={clearCart}>clear shopping cart</button>
    </div>
    {/* Cart Totals table component render */}
    <CartTotals />
  </Wrapper>
}

//Component style
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`
export default CartContent
