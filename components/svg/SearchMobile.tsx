import ProfilePostsPage from 'pages/Posts/[id]'
import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function SearchMobile({className, onClick, color}: Props) {
  return (
    <svg onClick={onClick} className={className} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0095 0C4.93901 0 0 4.93901 0 11.0095C0 17.0803 4.93901 22.0189 11.0095 22.0189C17.0803 22.0189 22.0189 17.0803 22.0189 11.0095C22.0189 4.93901 17.0803 0 11.0095 0ZM11.0095 19.9865C6.05962 19.9865 2.03252 15.9594 2.03252 11.0095C2.03252 6.05967 6.05962 2.03252 11.0095 2.03252C15.9593 2.03252 19.9864 6.05962 19.9864 11.0095C19.9864 15.9593 15.9593 19.9865 11.0095 19.9865Z" fill={color}/>
      <path d="M24.7022 23.2652L18.8757 17.4387C18.4787 17.0417 17.8357 17.0417 17.4387 17.4387C17.0416 17.8354 17.0416 18.479 17.4387 18.8757L23.2652 24.7022C23.4637 24.9007 23.7236 25 23.9837 25C24.2435 25 24.5037 24.9007 24.7022 24.7022C25.0993 24.3056 25.0993 23.6619 24.7022 23.2652Z" fill={color}/>
    </svg>
  )
}
SearchMobile.defaultProps = {
  color: 'white'
}

export default SearchMobile
