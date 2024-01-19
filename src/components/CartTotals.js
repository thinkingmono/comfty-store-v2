import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'

//Cart totals table component
const CartTotals = () => {
  //Destructure total_amount and shipping_fee from cart context
  const { total_amount, shipping_fee } = useCartContext();
  //Destructure myUser and loginWithRedirect from user context
  const { myUser, loginWithRedirect } = useUserContext();

  return <Wrapper>
    <div>
      {/* Totals table */}
      <article>
        <h5>subtotal: <span>{formatPrice(total_amount)}</span></h5>
        <p>shipping fee: <span>{formatPrice(shipping_fee)}</span></p>
        <hr />
        <h4>order total: {''} <span>{formatPrice(total_amount + shipping_fee)}</span></h4>
      </article>
      {/* Check if theres an user logged if it is render checkout button, if not login button display*/}
      {myUser ? <Link to='/checkout' className='btn'>Proceed to checkout</Link> : <button type="button" className='btn' onClick={loginWithRedirect}>Login</button>}
    </div>
  </Wrapper>
}

//Component style
const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
