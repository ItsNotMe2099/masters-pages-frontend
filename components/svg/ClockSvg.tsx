import React from 'react'

interface Props {
  className?: string
  color?: string
  stroke?: string
}

function ClockSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_727_16594)">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 7V12L15 15" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_727_16594">
          <rect width="24" height="24" fill={props.color} />
        </clipPath>
      </defs>
    </svg>
  )
}

ClockSvg.defaultProps = {
  stroke: '#0A0A0A',
  color: 'white'
}

export default ClockSvg
