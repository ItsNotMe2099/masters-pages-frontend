import React from 'react'

interface Props {
  color?: string,
  className?: string
}

function BookmarkSvg({color, className}: Props) {
  const getColor = () => {
    switch (color) {
      case 'white':
        return '#ffffff';
      default:
        return '#2A2C39'
    }
  }
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 14V1H12V14L6.5 8.6L1 14Z" stroke={getColor()}/>
    </svg>
  )
}

export default BookmarkSvg
