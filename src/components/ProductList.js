import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

//Product's page product list to render filterd products.
const ProductList = () => {
  //Destructure filtered_products and grid_view from filter context. Give to filtered_products the alias of products.
  const { filtered_products: products, grid_view } = useFilterContext();

  //If there are no products to display, render a message
  if (products.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search</h5>
  }

  //If grid view is not selected render products with a list View as default.
  if (grid_view === false) {
    return <ListView products={products} />
  }

  //If grid view is active render products with a grid view.
  return <GridView products={products} />
}

export default ProductList
