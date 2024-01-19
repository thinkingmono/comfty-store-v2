import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
//Actions import
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

//Function to get cart from browser's local storage. If there is, turn it into JSON object and return it. If not, return empty array.
const getCartFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

//Cart useReducer initial state. Get cart from local storage to initialize it.
const initialState = {
  cart: getCartFromLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

//Cart context creation
const CartContext = React.createContext()

//Cart provider configuration. Destructure children from props.
export const CartProvider = ({ children }) => {
  //useReducer declaration. Initialize state with initialState object. pass cart reducer from reducers folder.
  const [state, dispatch] = useReducer(reducer, initialState)

  //Dispatch call to add a product to the cart. Pass product info as a parameter into call back function. And pass action and payload (product info) into dispatch to handle with reducer and update state.
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }

  //Dispatch call to remove a product to the cart. Pass product id as a parameter into call back function. And pass action and payload (product id) into dispatch to handle with reducer and update state.
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  //Dispatch call to add a product to the cart. Pass product info as a parameter into call back function. And pass action and payload (product info) into dispatch to handle with reducer and update state.
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  //Dispatch call to clear the cart. Pass action to handle with reducer and update state.
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  }

  //useEffect hook to update cart totals and cart items every time cart changes.
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart])

  return (
    //Cart provider to share state values and functions. Wrap children components.
    <CartContext.Provider value={{ ...state, addToCart, clearCart, removeItem, toggleAmount }}>{children}</CartContext.Provider>
  )
}
//Custom hook creation to access cart context.
export const useCartContext = () => {
  return useContext(CartContext)
}
