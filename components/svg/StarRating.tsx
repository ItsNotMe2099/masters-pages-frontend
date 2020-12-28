import React from 'react'

interface Props {
  color?: string
  className?: string
}

function StarRating(props: Props) {
  return (
    <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "6px"}}>
      <path d="M7.47893 30.9532C6.67939 31.3634 5.77214 30.6446 5.9337 29.727L7.65292 19.9295L0.355554 12.978C-0.32592 12.3276 0.0282812 11.1387 0.941747 11.0103L11.0872 9.5686L15.611 0.60587C16.0191 -0.201957 17.1231 -0.201957 17.5312 0.60587L22.055 9.5686L32.2005 11.0103C33.114 11.1387 33.4682 12.3276 32.7867 12.978L25.4893 19.9295L27.2085 29.727C27.3701 30.6446 26.4629 31.3634 25.6633 30.9532L16.568 26.2803L7.47686 30.9532H7.47893Z" fill="#F2B705"/>
    </svg>
  )
}

export default StarRating
