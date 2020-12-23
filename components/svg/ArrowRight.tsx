import React from 'react'

interface Props {
  color?: string
  className?: string
}

function ArrowRight(props: Props) {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L6 6L1 11" stroke="#747474"/>
    </svg>
  )
}
ArrowRight.defaultProps = {
}

export default ArrowRight
