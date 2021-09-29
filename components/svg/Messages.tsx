import React from 'react'

interface Props {
  className?: string
}

function Messages(props: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.99988 9H15.9999V11H6.99988V9ZM15.9999 5H3.99988V7H15.9999V5ZM19.9999 2V20L15.9999 16H1.99988C0.899878 16 -0.00012207 15.11 -0.00012207 14V2C-0.00012207 0.9 0.899878 0 1.99988 0H17.9999C19.0999 0 19.9999 0.89 19.9999 2ZM17.9999 2H1.99988V14H16.8299L17.9999 15.17V2Z"/>
    </svg>

  )
}
Messages.defaultProps = {
}

export default Messages
