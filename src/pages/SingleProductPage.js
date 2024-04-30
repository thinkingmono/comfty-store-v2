import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//Single Product Page
const SingleProductPage = () => {
  //Destructure id from url using useParams hook.
  const { id } = useParams();
  //navigate declaration.
  const navigate = useNavigate();
  //Destructure values from product context
  const { fetchSingleProduct, single_product_loading: loading, single_product_error: error, single_product: product } = useProductsContext();

  //fetch product info every time id changes.
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id])

  //If there is an error, navigate to home after 3 secs.
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [error])

  //If loading render loader
  if (loading) {
    return <Loading />
  }

  //If error render error page
  if (error) {
    return <Error />
  }

  //Destructure product info from product.
  const { name, price, description, inventory: stock, stars, reviews, id: sku, company, image } = product;
  const imgObj = { url: image, filename: 'product image' }
  const imgArray = [imgObj]

  return <Wrapper>
    {/* Breadcrumb */}
    <PageHero title={name} products />
    <div className="section section-center page">
      {/* Back to products page link */}
      <Link to='/products' className='btn'>Back to products</Link>
      <div className="product-center">
        {/* Product images */}
        <ProductImages images={imgArray} />
        {/* Product information */}
        <section className="content">
          <h2>{name}</h2>
          {/* Stars */}
          <Stars stars={stars} reviews={reviews} />
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          {/* Stock */}
          <p className="info">
            <span>Available : </span>
            {/* If there are units available show in stock, if not out of stock. */}
            {stock > 0 ? 'In stock' : 'out of stock'}
          </p>
          {/* SKU */}
          <p className="info">
            <span>SKU : </span>
            {sku}
          </p>
          {/* Brand */}
          <p className="info">
            <span>Brand : </span>
            {company}
          </p>
          <hr />
          {/* If there are units available show add to cart component */}
          {stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </div>
  </Wrapper>
}

//Component style
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
