import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

//Single product's page add to cart section component. Destructure product info from props.
const AddToCart = ({ product }) => {
  //Destructure addTocart from cart context.
  const { addToCart } = useCartContext();
  //Destructure id, stock and colors from product passed into props.
  const { id, stock, colors } = product;
  //mainColor state variable declaration to update product's default color. Initialize with first color from colors array.
  const [mainColor, setMainColor] = useState(colors[0]);
  //amount state variable declaration to update product's amount. Initialize in 1.
  const [amount, setAmount] = useState(1);

  //Amount's plus button function to increase product's amount.
  const increase = () => {
    //set amount state passing prev amount state as a parameter into call back function.
    setAmount((prevAmount) => {
      //Set tempAmount with prev amount value plus 1.
      let tempAmount = prevAmount + 1;
      //Check if tempAmount is greater than product's current stock. If it is set tempAmount to actual stock.
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      //Return new amount
      return tempAmount
    })
  }

  //Amount's minus button function to decrease product's amount.
  const decrease = () => {
    //set amount state passing prev amount state as a parameter into call back function.
    setAmount((prevAmount) => {
      //Set tempAmount with prev amount value minus 1.
      let tempAmount = prevAmount - 1;
      //Check if tempAmount is less than one. If it is set tempAmount to 1.
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      //Return new amount
      return tempAmount
    })
  }

  //Component JSX
  return <Wrapper>
    {/* Colors spots module */}
    <div className="colors">
      <span>colors: </span>
      <div>
        {/*Map over colors array to render every color spot as a button with color's background*/}
        {colors.map((color, index) => {
          return (
            //Color spot. Set active style based in if current color is equal to mainColor state. pass setMainColor as an onCilck event handler into call back function. update main color with selected color.
            <button type="button" key={index} className={`${mainColor === color ? 'color-btn active' : 'color-btn'}`} style={{ background: color }} onClick={() => setMainColor(color)}>{mainColor === color ? <FaCheck /> : null}</button>
          )
        })}
      </div>
    </div>
    {/* Render amount buttons and add to cart link */}
    <div className="btn-container">
      {/* Amount buttons component. Pass current amount, increase and decrease functions to handle amount change into component*/}
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      {/* Add to cart link. Pass addToCart handler as an onClicks event handler. Pass id, mainColor, amount and product to function as a parameters*/}
      <Link to='/cart' className='btn' onClick={() => addToCart(id, mainColor, amount, product)}>Add to cart</Link>
    </div>
  </Wrapper>
}

//Component style.
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
