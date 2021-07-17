import React from 'react'

interface Props {
  color?: string
  className?: string
}

function NewMessage(props: Props) {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 0L0 15.1875L8.62868 18.3833L21.9376 5.90626L11.8144 19.5632L11.8226 19.5663L11.8125 19.5632V27L16.6515 21.3547L22.7813 23.625L27 0Z" fill="black"/>
    </svg>
  )
}
NewMessage.defaultProps = {
}

export default NewMessage
