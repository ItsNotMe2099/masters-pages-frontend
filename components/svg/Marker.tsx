import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Marker({color, className}: Props) {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 0.5C2.24305 0.5 0 2.74305 0 5.5C0 8.25695 2.24305 10.5 5 10.5C7.75695 10.5 10 8.25695 10 5.5C10 2.74305 7.75695 0.5 5 0.5ZM5 9.875C2.58758 9.875 0.625003 7.91242 0.625003 5.5C0.625003 3.08758 2.58758 1.125 5 1.125C7.41242 1.125 9.375 3.08758 9.375 5.5C9.375 7.91242 7.41242 9.875 5 9.875Z" fill={color}/>
      <path d="M5 9.875C2.58758 9.875 0.625003 7.91242 0.625003 5.5C0.625003 3.08758 2.58758 1.125 5 1.125C7.41242 1.125 9.375 3.08758 9.375 5.5C9.375 7.91242 7.41242 9.875 5 9.875Z" fill={color}/>
    </svg>
  )
}
Marker.defaultProps = {
  color: '#27C60D'
}

export default Marker
