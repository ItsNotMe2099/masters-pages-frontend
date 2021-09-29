import React from 'react'

interface Props {
  className?: string
}

function News(props: Props) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9999 2V16H1.99988V2H17.9999ZM17.9999 0H1.99988C0.889878 0 -0.00012207 0.89 -0.00012207 2V16C-0.00012207 17.11 0.889878 18 1.99988 18H17.9999C19.1099 18 19.9999 17.11 19.9999 16V2C19.9999 0.89 19.1099 0 17.9999 0ZM15.9999 12H3.99988V14H15.9999V12ZM7.99988 4H3.99988V10H7.99988V4ZM9.99988 6H15.9999V4H9.99988V6ZM15.9999 8H9.99988V10H15.9999V8Z"/>
    </svg>
  )
}
News.defaultProps = {
}

export default News
