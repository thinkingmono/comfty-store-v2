import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
//Actions import
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

//Products useReducer initial state.
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}

}

//Product context creation
const ProductsContext = React.createContext()

//Products provider configuration. Destructure children from props.
export const ProductsProvider = ({ children }) => {
  //useReducer declaration. Initialize state with initialState object. pass product reducer from reducers folder.
  const [state, dispatch] = useReducer(reducer, initialState)

  //Dispatch call to openSidebar. Pass action type into dispatch to handle with reducer and update state.
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  }

  //Dispatch call to closeSidebar. Pass action type into dispatch to handle with reducer and update state.
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  //Fetch products from API using axios. Success request: Call dispatch to update products in state. Error request: Call dispatch to update error in state
  const fecthProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      // console.log({ response, products });
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }

  //Fetch single product information from API using axios. Success request: Call dispatch to update single_product object in state. Error request: Call dispatch to update error in state
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  }

  //Fetch products every time product context loads.
  useEffect(() => {
    fecthProducts(url);
  }, [])

  return (
    //Product provider to share state values and functions. Wrap children components.
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
//Custom hook creation to access product context.
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
