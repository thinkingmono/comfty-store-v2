import React from 'react'
import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

//Home featured products module.
const FeaturedProducts = () => {
  //Destructure products_loading, products_error, featured_products and alias them as loading, error and featured in that order.
  const { products_loading: loading, products_error: error, featured_products: featured } = useProductsContext();

  //If loading render loader.
  if (loading) {
    return <Loading />
  }

  //If there's an error render error page.
  if (error) {
    return <Error />
  }

  return <Wrapper className='section'>
    {/* Title */}
    <div className="title">
      <h2>Featured Products</h2>
      <div className="underline"></div>
    </div>
    {/* Featured Products. Slice featured into 3 first positions, map over them to render each one as a Product component. */}
    <div className="section-center featured">
      {featured.slice(0, 3).map((product) => {
        return <Product key={product.id} {...product} />
      })}
    </div>
    {/* Link to product page */}
    <Link to='/products' className='btn'>all products</Link>
  </Wrapper>
}

//Component style.
const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
