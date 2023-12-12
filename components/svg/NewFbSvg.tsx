import React from 'react'

interface Props {
  className?: string
}

function NewFbSvg(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M28 0H4C1.79333 0 0 1.79333 0 4V28C0 30.2053 1.79333 32 4 32H28C30.2053 32 32 30.2053 32 28V4C32 1.79333 30.2053 0 28 0Z" fill="#3B5999" />
      <path d="M21.9997 15.9998V11.9998C21.9997 10.8958 22.8957 10.9998 23.9997 10.9998H25.9997V5.99983H21.9997C18.685 5.99983 15.9997 8.68517 15.9997 11.9998V15.9998H11.9997V20.9998H15.9997V31.9998H21.9997V20.9998H24.9997L26.9997 15.9998H21.9997Z" fill="white" />
    </svg>
  )
}
NewFbSvg.defaultProps = {
}

export default NewFbSvg
