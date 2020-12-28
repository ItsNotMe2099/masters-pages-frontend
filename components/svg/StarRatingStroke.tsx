import React from 'react'

interface Props {
  color?: string
  className?: string
}

function StarRatingStroke(props: Props) {
  return (
    <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "6px"}}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.9337 29.727C5.81102 30.4237 6.30457 31.0058 6.89928 31.0661C7.08712 31.0852 7.28506 31.0522 7.47686 30.9543C7.47671 30.9544 7.477 30.9542 7.47686 30.9543C7.4774 30.954 7.47838 30.9535 7.47893 30.9532V30.9522L16.568 26.2803L25.6633 30.9532C26.4629 31.3633 27.3701 30.6446 27.2085 29.727L25.4893 19.9295L32.7867 12.978C33.4682 12.3276 33.114 11.1387 32.2005 11.0103L22.055 9.5686L17.5312 0.60587C17.1231 -0.201957 16.0191 -0.201957 15.611 0.60587L11.0872 9.5686L0.941747 11.0103C0.028281 11.1387 -0.32592 12.3276 0.355554 12.978L7.65292 19.9295L5.9337 29.727ZM4.09484 13.0873L10.3467 19.0428L8.87619 27.423L16.5678 23.4695L24.2664 27.4248L22.7955 19.0428L29.0474 13.0873L20.4112 11.8601L16.5711 4.25198L12.731 11.8601L4.09484 13.0873ZM8.39612 30.1588C8.39614 30.1587 8.39611 30.1589 8.39612 30.1588Z" fill="#F2B705"/>
    </svg>
  )
}

export default StarRatingStroke
