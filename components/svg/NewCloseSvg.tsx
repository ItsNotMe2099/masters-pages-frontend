import React from 'react'

interface Props {
  color?: string
  className?: string
  onClick?: () => void
}

function NewCloseSvg({ color, onClick, className }: Props) {
  return (
    <svg className={className} onClick={onClick} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1538_30520)">
        <path d="M6.2248 18.825L5.1748 17.775L10.9498 12L5.1748 6.22499L6.2248 5.17499L11.9998 10.95L17.7748 5.17499L18.8248 6.22499L13.0498 12L18.8248 17.775L17.7748 18.825L11.9998 13.05L6.2248 18.825Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_1538_30520">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
NewCloseSvg.defaultProps = {
  color: '#000'
}

export default NewCloseSvg
