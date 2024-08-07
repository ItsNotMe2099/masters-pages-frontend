import React from 'react'

interface Props {
  className?: string
}

function Reports(props: Props) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.9999 8.78L18.2399 1.45L19.9699 2.45L14.7399 11.5L8.22988 7.75L3.45988 16H19.9999V18H-0.00012207V0H1.99988V14.54L7.49988 5L13.9999 8.78Z"/>
    </svg>

  )
}
Reports.defaultProps = {
}

export default Reports
