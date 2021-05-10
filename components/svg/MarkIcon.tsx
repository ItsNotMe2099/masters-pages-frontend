import React from 'react'

interface Props {
  color?: string
  className?: string
}

function MarkIcon({color, className}: Props) {
  return (
    <svg className={className} width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.795 0.199426C13.5216 -0.0664754 13.0784 -0.0664754 12.805 0.199426L4.41859 8.35645L1.19499 5.22105C0.921634 4.95515 0.478447 4.95518 0.205037 5.22105C-0.0683456 5.48693 -0.0683456 5.91799 0.205037 6.18389L3.92362 9.80066C4.19689 10.0665 4.64041 10.0664 4.91357 9.80066L13.795 1.16229C14.0684 0.896414 14.0683 0.465328 13.795 0.199426Z" fill={color}/>
    </svg>
  )
}
MarkIcon.defaultProps = {
  color: 'black'
}

export default MarkIcon
