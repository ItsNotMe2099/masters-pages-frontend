import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function Phone({className, onClick}: Props) {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path className="st0" d="M18.5,13.1l-4.3-0.9c-0.2,0-0.4,0-0.5,0.2L12,13.9c-3-1.5-5.4-3.9-6.9-6.9l1.6-1.6C6.9,5.2,6.9,5,6.9,4.8
	L5.9,0.5C5.9,0.2,5.6,0,5.4,0C4.5,0,3.6,0.2,2.8,0.6C2.1,1,1.5,1.6,1,2.3C0.5,3,0.2,3.8,0.1,4.6c-0.1,0.9,0,1.7,0.3,2.6
	c1,2.6,2.5,5.1,4.5,7c2,2,4.4,3.5,7,4.5c0.6,0.2,1.2,0.3,1.8,0.3c0.3,0,0.5,0,0.8-0.1c0.8-0.1,1.6-0.4,2.3-0.9
	c0.7-0.5,1.3-1.1,1.7-1.9c0.4-0.8,0.6-1.6,0.6-2.5C19,13.4,18.8,13.1,18.5,13.1z"/>
    </svg>

  )
}
Phone.defaultProps = {
}

export default Phone
