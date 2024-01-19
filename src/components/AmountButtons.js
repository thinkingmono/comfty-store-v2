import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

//Amount buttons and quantity display component. Destructure increase, decrease and amount from props.
const AmountButtons = ({ increase, decrease, amount }) => {
  return <Wrapper className='amount-btns'>
    {/* Minus button. Add decrease function into onClick event handler to decrease product require quantity in one. */}
    <button type="button" className='amount-btn' onClick={decrease}><FaMinus /></button>
    {/* Quantity box wich displays current product selected quantity */}
    <h2 className="amount">{amount}</h2>
    {/* Plus button. Add increase function into onClick event handler to increase product require quantity in one. */}
    <button type="button" className='amount-btn' onClick={increase}><FaPlus /></button>
  </Wrapper>
}

//Component style
const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
