import React from 'react'

interface Props {
  color?: string
  className?: string
}

function MainSliderArrowRight(props: Props) {
  return (
    <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 28L14.5 15L1.5 2" stroke="#F2F2F2" stroke-width="3" stroke-linejoin="round"/>
    </svg>
  )
}
MainSliderArrowRight.defaultProps = {
}

export default MainSliderArrowRight
