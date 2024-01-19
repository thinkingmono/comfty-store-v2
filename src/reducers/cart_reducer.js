//Actions Import
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

//Cart reducer configuration. Pass state and action from dispatch.
const cart_reducer = (state, action) => {

  //Add to cart action handler.
  if (action.type === ADD_TO_CART) {
    //Destructure id, color, amount and products from action's payload.
    const { id, color, amount, product } = action.payload;
    //Find product in cart, comparing id from payload and id+color concatenation.
    const tempItem = state.cart.find((item) => {
      return item.id === id + color;
    })
    //If product was find in the cart.
    if (tempItem) {
      //Map over cart products and...
      const tempCart = state.cart.map((cartItem) => {
        //If product is already in the cart
        if (cartItem.id === id + color) {
          //Store product current amount + new amount.
          let newAmount = cartItem.amount + amount;
          //If newAmount is bigger than stock availability. Set newAmount with available stock.
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          //Return spread it product info, updating amount with calculated newAmount.
          return { ...cartItem, amount: newAmount };
        } else {
          //If product is not in the cart, return same product without modify.
          return cartItem
        }
      })
      //Return same state, updating cart with tempCart wich has new products an quantities.
      return { ...state, cart: tempCart }
    } else {
      //If product was not found in the cart. Build a newItem object wich stores new cart product info wich is going to be add it into cart.
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      //Return spreas it state parameters, Update cart with past product list + new product.
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  //Remove cart item action handler
  if (action.type === REMOVE_CART_ITEM) {
    //From cart. Filter all products with different id that the one from the action payload.
    let tempCart = state.cart.filter((item) => item.id !== action.payload);
    //Return spread it state. Update cart with tempCart (cart without removed product)
    return { ...state, cart: tempCart }
  }

  //Clear cart action handler
  if (action.type === CLEAR_CART) {
    //Return same state, updating cart with an empty array.
    return { ...state, cart: [] }
  }

  //Toggle cart item amount handler
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    //Destructure id and value from action payload.
    const { id, value } = action.payload;
    //Map over cart and...
    let tempCart = state.cart.map((item) => {
      //Check wich product is going to be modify comparing ids.
      if (item.id === id) {
        //If action payload bring 'inc' means increase...
        if (value === 'inc') {
          //Increase desire product amount in one and store it into newAmount.
          let newAmount = item.amount + 1;
          //If newAmount is bigger than stock availability, set newAmount with stock availability value.
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          //Return same product but with new amount.
          return { ...item, amount: newAmount }
        }
        //If action payload bring 'dec' means decrease...
        if (value === 'dec') {
          //Decrease desire product amount in one and store it into newAmount.
          let newAmount = item.amount - 1;
          //If newAmount is less than 1, set newAmount ti 1.
          if (newAmount < 1) {
            newAmount = 1;
          }
          //Return same product but with new amount.
          return { ...item, amount: newAmount }
        }
      }
      //If id does not correspond with product to modify return same product without change.
      return item
    })
    //Return same state but update cart with tempCart wich contains products with new quantities.
    return { ...state, cart: tempCart }
  }

  //Count cart totals handler
  if (action.type === COUNT_CART_TOTALS) {
    //Destructure total_items and total_amount from reduce.
    //total = What we get at the end.
    //cartItem = Each product in the cart.
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      //Destructure amount and price from cartItem (product)
      const { amount, price } = cartItem;
      //set new total_items = total_items + product amount
      total.total_items += amount;
      //set new total_amount = total_amount + (product amount * product price)
      total.total_amount += amount * price;
      //Return new total
      return total
    }, { total_items: 0, total_amount: 0 })
    //Return same state but update total_items and total_amount with destructure values from reduce.
    return { ...state, total_items, total_amount }
  }

  //Show error if action handler is not found.
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
