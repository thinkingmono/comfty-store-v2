import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

//Single Product Page Stars Rating Component. Destructure stars and reviews from props.
const Stars = ({ stars, reviews }) => {
  // console.log({ stars, reviews });
  //Build 5 positions star array based in stars rating. Set an empty, half fill or fill star in each position depends on the case.
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ?
          (<BsStarFill />)
          : stars >= number ?
            (<BsStarHalf />)
            : (<BsStar />)}
      </span>
    )
  })

  //Return stars rating and quantity reviews.
  return <Wrapper>
    <div className="stars">{tempStars}</div>
    <p className="reviews">({reviews} customer reviews)</p>
  </Wrapper>
}

//Component style
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
