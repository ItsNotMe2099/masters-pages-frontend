import React from 'react'

interface Props {
  className?: string
}

function PlayIconAlt(props: Props) {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="33.5863" cy="33.5863" r="33.5863" fill="white"/>
      <path d="M23.9912 19.6917C23.9912 17.8058 26.0671 16.6573 27.6648 17.6593L49.0588 31.0758C50.5581 32.016 50.5581 34.2005 49.0588 35.1407L27.6648 48.5572C26.0671 49.5592 23.9912 48.4107 23.9912 46.5248V19.6917Z" fill="#F2B705"/>
    </svg>
  )
}
PlayIconAlt.defaultProps = {
  
}

export default PlayIconAlt
