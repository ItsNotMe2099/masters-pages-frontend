import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowLeftSmall(props: Props) {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.126589 5.27441L5.26514 9.88692C5.4335 10.038 5.70608 10.0377 5.87415 9.88614C6.0421 9.73459 6.04167 9.48911 5.87329 9.33795L1.0406 4.99998L5.87346 0.662029C6.04182 0.510859 6.04225 0.265527 5.87433 0.113965C5.79007 0.0379887 5.67969 -7.63928e-09 5.56931 -1.02718e-08C5.45921 -1.28976e-08 5.34927 0.037735 5.26516 0.113184L0.126589 4.72557C0.0455018 4.79819 1.21705e-07 4.89701 1.19249e-07 4.99998C1.16793e-07 5.10295 0.045632 5.20166 0.126589 5.27441Z" fill="black"/>
    </svg>

  )
}
ArrowLeftSmall.defaultProps = {

}

export default ArrowLeftSmall
