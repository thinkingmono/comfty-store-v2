import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
//Actions import
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

//Filter useReducer initial state.
const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
}

//Filter context creation
const FilterContext = React.createContext()

//Filter provider configuration. Destructure children from props.
export const FilterProvider = ({ children }) => {
  //Destructure products from products context.
  const { products } = useProductsContext();
  //useReducer declaration. Initialize state with initialState object. pass filter reducer from reducers folder.
  const [state, dispatch] = useReducer(reducer, initialState);

  //useEffect hook to fetch products every time products change.
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  //useEffect hook to show filtered products and sort them based in sort and filters selection. update every time products. sort or filters criteria change.
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters])

  //Set grid view as current products view. Call dispatch pass action type to reducer handle and state update
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  }

  //Set list view as current products view. Call dispatch pass action type to reducer handle and state update
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  }

  //Handles sort field selection change updating state with new value. Call dispatch pass action type and payload (field value) to reducer handle and state update.
  const updateSort = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    dispatch({ type: UPDATE_SORT, payload: value });
  }

  //Handles filter's values update. If statement by type of field to extract field value. Call dispatch pass action type and payload (field name and value) to reducer handle and state update.
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'category') {
      value = e.target.textContent;
    }
    if (name === 'color') {
      value = e.target.dataset.color;
    }
    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'shipping') {
      value = e.target.checked
    }

    // console.log({ name, value });
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }

  //Set filters to default value. Call dispatch pass action type to reducer handle and state update.
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    //Filter provider to share state values and functions. Wrap children components.
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
//Custom hook creation to access filter context.
export const useFilterContext = () => {
  return useContext(FilterContext)
}
