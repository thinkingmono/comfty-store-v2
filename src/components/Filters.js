import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

//Products page filters.
const Filters = () => {
  //Destructure filters object, updateFilters, clearFilters and all_products from filter context.
  const {
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping
    }, updateFilters, clearFilters, all_products
  } = useFilterContext();

  //unique categories array build with getUniqueValues function. Pass in all_products and type to filter unique categories
  const categories = getUniqueValues(all_products, 'category');
  //unique companies array build with getUniqueValues function. Pass in all_products and type to filter unique companies
  const companies = getUniqueValues(all_products, 'company');
  //unique colors array build with getUniqueValues function. Pass in all_products and type to filter unique colors
  const colors = getUniqueValues(all_products, 'colors');

  // console.log({ categories, companies, colors });
  // console.log(categories);

  //Filters
  return <Wrapper>
    <div className="content">
      {/* Filters form */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Search field */}
        <div className="form-control">
          <input type="text" name="text" id="text" placeholder='search' value={text} onChange={updateFilters} className='search-input' />
        </div>
        {/* Categories buttons */}
        <div className="form-control">
          <h5>Categories</h5>
          {/* Map over unique categories array return button for each categorie. Set active class based in current category and render category comparison */}
          {categories.map((cat, index) => {
            return <button type="button" name='category' key={index} className={`${category === cat.toLowerCase() ? 'active' : null}`} onClick={updateFilters}>
              {cat}
            </button>
          })}
        </div>
        {/* Companies select field */}
        <div className="form-control">
          <h5>Companies</h5>
          <select name='company' className='company' value={company} onChange={updateFilters}>
            {/* Map over unique companies to render each company as an option for the select */}
            {companies.map((com, index) => {
              return <option value={com} key={index}>{com}</option>
            })}
          </select>
        </div>
        {/* Colors buttons */}
        <div className="form-control">
          <h5>Colors</h5>
          <div className="colors">
            {/* Map over colors array and render them as a button. If color is all render text button. Other case, render color spot*/}
            {colors.map((col, index) => {
              if (col === 'all') {
                return <button type="button" key={index} name='color' className={`${color === col ? 'all-btn active' : 'all-btn'}`} onClick={updateFilters} data-color='all'>All</button>
              }
              return <button type="button" key={index} name='color' className={`${color === col ? 'color-btn active' : 'color-btn'}`} style={{ backgroundColor: col }} onClick={updateFilters} data-color={col}>
                {color === col ? <FaCheck /> : null}
              </button>
            })}
          </div>
        </div>
        {/* Price range field */}
        <div className="form-control">
          <h5>Price</h5>
          <p className="price">{formatPrice(price)}</p>
          {/* Price range configure Set minimum to min_price value, set max to max_price value */}
          <input type="range" name='price' min={min_price} max={max_price} onChange={updateFilters} value={price} />
        </div>
        {/* Shipping checkbox */}
        <div className="form-control shipping">
          <label htmlFor="shipping">Free Shipping</label>
          <input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={updateFilters} />
        </div>
      </form>
      {/* Clear filters button field. */}
      <button type="button" className='clear-btn' onClick={clearFilters}>Clear Filters</button>
    </div>
  </Wrapper>
}

//Component field
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
