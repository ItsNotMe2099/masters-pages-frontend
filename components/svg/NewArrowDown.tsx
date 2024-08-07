import React from 'react'

interface Props {
  color?: string
  className?: string
}

function NewArrowDown(props: Props) {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.7625 0.2375L7.5 5.9625L13.2375 0.2375L15 2L7.5 9.5L0 2L1.7625 0.2375Z" fill={props.color}/>
    </svg>
  )
}
NewArrowDown.defaultProps = {
  color: '#000'
}

export default NewArrowDown
