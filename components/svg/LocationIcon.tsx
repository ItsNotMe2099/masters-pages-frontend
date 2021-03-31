import React from 'react'

interface Props {
  className?: string
}

function LocationIcon({className}: Props) {
  return (
    <svg className={className} width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.69162 0 0 2.65085 0 5.90912C0 10.0044 6.0059 17 6.0059 17C6.0059 17 12 9.80301 12 5.90912C12 2.65085 9.30848 0 6 0ZM7.81032 7.63931C7.31115 8.13082 6.65563 8.37663 6 8.37663C5.34448 8.37663 4.68874 8.13082 4.18978 7.63931C3.19154 6.65629 3.19154 5.05673 4.18978 4.07361C4.67315 3.59735 5.31614 3.33505 6 3.33505C6.68386 3.33505 7.32674 3.59745 7.81032 4.07361C8.80857 5.05673 8.80857 6.65629 7.81032 7.63931Z" fill="#6D718C"/>
    </svg>
  )
}
LocationIcon.defaultProps = {

}

export default LocationIcon
