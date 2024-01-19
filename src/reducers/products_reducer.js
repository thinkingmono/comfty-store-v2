//Actions Import
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

//Products reducer configuration. Pass state and action from dispatch.
const products_reducer = (state, action) => {

  //Sidebar open action handler
  if (action.type === SIDEBAR_OPEN) {
    //Set isSidebarOpen to true in state
    return { ...state, isSidebarOpen: true };
  }

  //Sidebar close action handler
  if (action.type === SIDEBAR_CLOSE) {
    //Set isSidebarOpen to false in state
    return { ...state, isSidebarOpen: false };
  }

  //Get products begin action handler
  if (action.type === GET_PRODUCTS_BEGIN) {
    //Set products_loading to true in state
    return { ...state, products_loading: true };
  }

  //Get products success action handler
  if (action.type === GET_PRODUCTS_SUCCESS) {
    //Filter featured products from action payload products
    const featured_products = action.payload.filter((product) => product.featured === true);
    //Set products_loading to false, products array with products from payload and featured_products with featured_products array
    return { ...state, products_loading: false, products: action.payload, featured_products };
  }

  //Get products error action handler
  if (action.type === GET_PRODUCTS_ERROR) {
    //Set products_loading to false and products_error to true.
    return { ...state, products_loading: false, products_error: true };
  }

  //Get single product begin action handler
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    //Set single_product_loading to true and single_product_error to false.
    return { ...state, single_product_loading: true, single_product_error: false };
  }

  //Get single product success action handler
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    //Set single_product_loading to false and single_product to product from action payload.
    return { ...state, single_product_loading: false, single_product: action.payload };
  }

  //Get single product error action handler
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    //Set single_product_loading to false and single_product_error to true.
    return { ...state, single_product_loading: false, single_product_error: true };
  }

  //Show error if action handler is not found.
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
