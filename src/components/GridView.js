import React from 'react'
import styled from 'styled-components'
import Product from './Product'

//Products page grid view. Destructure products from props.
const GridView = ({ products }) => {
  return <Wrapper>
    <div className="products-container">
      {/* Map over products to render each product as a Product component */}
      {products.map((product) => {
        return <Product key={product.id} {...product} />
      })}
    </div>
  </Wrapper>
}

//Component style
const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView
