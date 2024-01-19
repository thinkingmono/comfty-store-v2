import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//Breadcrumb component. Destructure title and products from props.
const PageHero = ({ title, products }) => {
  return <Wrapper>
    <div className="section-center">
      <h3><Link to='/'>Home</Link>
        {/* If parent provides products prop render products link */}
        {products && <Link to='/products'>/ Products</Link>}
        / {title}</h3>
    </div>
  </Wrapper>
}

//Component style
const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
