import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

//About page
const AboutPage = () => {
  return <main>
    {/* Breadcrumb */}
    <PageHero title='About' />
    <Wrapper className='page section section-center'>
      {/* Image */}
      <img src={aboutImg} alt='nice desk' />
      {/* Text */}
      <article>
        <div className="title">
          <h2>Our History</h2>
          <div className="underline"></div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium temporibus ab ad doloremque quam? Eos in quasi asperiores necessitatibus temporibus. Similique explicabo veniam deserunt officiis, fuga nobis facilis nesciunt suscipit deleniti unde odit aperiam facere optio fugiat, rerum et vel eius aliquid ea illo quaerat! Nemo labore inventore corporis consequatur minima debitis minus quae repudiandae! Qui, aspernatur! Velit consequuntur ex perferendis illum, reprehenderit earum quisquam ipsum dolorem asperiores magnam qui quidem omnis dolor ab enim, et quod. At cumque labore doloremque eligendi, quisquam sapiente modi libero assumenda totam dolor deserunt blanditiis eius odit voluptate corrupti velit suscipit delectus eos atque.</p>
      </article>
    </Wrapper>
  </main>
}

//Component style
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
