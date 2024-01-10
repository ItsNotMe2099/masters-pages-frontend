import React from 'react'

interface Props {
  className?: string
  onClick: () => void
}

function SliderArrowSvg(props: Props) {
  return (
    <svg onClick={props.onClick} className={props.className} xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
      <circle opacity="0.5" cx="15" cy="15" r="15" transform="matrix(-1 0 0 1 30 0.0683594)" fill="white" />
      <path d="M16.7117 15.3686L11.7617 20.3186L12.8367 21.3936L18.8617 15.3686L12.8367 9.34355L11.7617 10.4186L16.7117 15.3686Z" fill="black" />
    </svg>
  )
}

SliderArrowSvg.defaultProps = {

}

export default SliderArrowSvg
