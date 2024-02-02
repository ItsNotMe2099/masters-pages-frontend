import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ControlRightEventSvg(props: Props) {
  return (
    <svg className={props.className} width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.87341 5.22559L0.734858 0.613083C0.566499 0.462049 0.293923 0.462303 0.125846 0.613865C-0.0421 0.765407 -0.041666 1.01089 0.126714 1.16205L4.9594 5.50002L0.126541 9.83797C-0.0418182 9.98914 -0.0422522 10.2345 0.125673 10.386C0.209928 10.462 0.320308 10.5 0.430689 10.5C0.540787 10.5 0.650733 10.4623 0.734836 10.3868L5.87341 5.77443C5.9545 5.70181 6 5.60299 6 5.50002C6 5.39705 5.95437 5.29834 5.87341 5.22559Z" fill={props.color} />
    </svg>
  )
}
ControlRightEventSvg.defaultProps = {
  color: 'black'
}

export default ControlRightEventSvg
