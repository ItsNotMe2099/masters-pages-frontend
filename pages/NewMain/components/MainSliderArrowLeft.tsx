import React from 'react'

interface Props {
  color?: string
  className?: string
}

function MainSliderArrowLeft(props: Props) {
  return (
    <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 2L1.5 15L14.5 28" stroke="#F2F2F2" strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  )
}
MainSliderArrowLeft.defaultProps = {
}

export default MainSliderArrowLeft
