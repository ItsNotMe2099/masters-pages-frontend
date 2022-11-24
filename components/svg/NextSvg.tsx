import React from 'react'

interface Props {
  color?: string
  className?: string
}

function NextSvg(props: Props) {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 7.00008V9.00008H12.5L7 14.5001L8.42 15.9201L16.34 8.00008L8.42 0.0800781L7 1.50008L12.5 7.00008H0.5Z"/>
    </svg>
  )
}

export default NextSvg
