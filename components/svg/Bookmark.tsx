import React from 'react'

interface Props {
  color?: string,
  className?: string
  isSaved?: boolean
}

function BookmarkSvg({color, className, isSaved}: Props) {
  const getColor = () => {
    switch (color) {
      case 'white':
        return '#ffffff'
      default:
        return '#2A2C39'
    }
  }
  return (
    isSaved ? <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 13V0H11V13L5.5 7.6L0 13Z" fill="#FD5742"/>
      </svg>
     : <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 14V1H12V14L6.5 8.6L1 14Z" stroke={getColor()}/>
    </svg>
  )
}

export default BookmarkSvg
