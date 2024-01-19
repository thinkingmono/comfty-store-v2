//Actions Import
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

//Filter reducer configuration. Pass state and action from dispatch.
const filter_reducer = (state, action) => {

  //Load products action handler
  if (action.type === LOAD_PRODUCTS) {
    //Map over products passed from payload and store their prices into maxPrice array.
    let maxPrice = action.payload.map((p) => p.price);
    //Find max price from maxPrice array.
    maxPrice = Math.max(...maxPrice);
    //Update all_products and filtered_products with products from payload. Update max_price and price filters with maxPrice variable.
    return { ...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: { ...state.filters, max_price: maxPrice, price: maxPrice } };
  }

  //Set grid view action handler
  if (action.type === SET_GRIDVIEW) {
    //Update grid_view to true in state
    return { ...state, grid_view: true }
  }

  //Set list view action handler
  if (action.type === SET_LISTVIEW) {
    //Update grid_view to false in state.
    return { ...state, grid_view: false }
  }

  //Update sort action handler
  if (action.type === UPDATE_SORT) {
    //Update sort criteria in state.
    return { ...state, sort: action.payload }
  }

  //Sort products action handler.
  if (action.type === SORT_PRODUCTS) {
    //Destructure sort, filtered_products from state
    const { sort, filtered_products } = state;
    //Copy spread filtered_products into a new array.
    let tempProducts = [...filtered_products];
    //Update tempProducts array with products sorted by lowest to highest price
    if (sort === 'price-lowest') {
      // tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1
        }

        if (a.price > b.price) {
          return 1
        }

        return 0
      });
    }

    //Update tempProducts array with products sorted by highest to lowest price
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    //Update tempProducts array with products sorted by a to z
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    //Update tempProducts array with products sorted by z to a
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    //Update filtered_products with tempProducts sorted array.
    return { ...state, filtered_products: tempProducts }
  }

  //Update filters action handler
  if (action.type === UPDATE_FILTERS) {
    //Destructure filter field name and value from action payload.
    const { name, value } = action.payload;
    //Update desire filter in state.
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  //Filter products action handler
  if (action.type === FILTER_PRODUCTS) {
    //Destructure all_products from state.
    const { all_products } = state;
    //Destructure filters from state filters.
    const { text, company, category, color, price, shipping } = state.filters;
    //Copy all_products into a new array tempProducts.
    let tempProducts = [...all_products];
    //Filter products by text.
    if (text) {
      //Update tempProducts array with products which starts with text value
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      })
    }

    //Filter products by category.
    if (category !== 'all') {
      //Update tempProducts array with products which category match category value
      tempProducts = tempProducts.filter((product) => {
        // console.log(product);
        return category === product.category;
      })
    }

    //Filter products by company.
    if (company !== 'all') {
      //Update tempProducts array with products which company match company value
      tempProducts = tempProducts.filter((product) => {
        // console.log(product);
        return company === product.company;
      })
    }

    //Filter products by color.
    if (color !== 'all') {
      // console.log(color);
      //Update tempProducts array with products which color match color value
      tempProducts = tempProducts.filter((product) => {
        return product.colors.includes(color);
        // return product.colors.find(col => color === col);
      })
    }

    //Filter products by color.
    if (price) {
      //Update tempProducts array with products which price is less or equal to price value
      tempProducts = tempProducts.filter((product) => {
        return product.price <= price;
      })
    }

    //Filter products by shipping.
    if (shipping) {
      //Update tempProducts array with products which shipping match shipping value
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      })
    }

    //Update filtered_products with new filtered array tempProducts.
    // console.log(tempProducts);
    return { ...state, filtered_products: tempProducts }
  }

  //Clear filters action handler
  if (action.type === CLEAR_FILTERS) {
    //Return default filters values keeping max price range.
    return {
      ...state, filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }

  //Show error if action handler is not found.
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
