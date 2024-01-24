import React from 'react'

interface Props {
  className?: string
  color?: string
}

function ClockInputSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill={props.color} />
      <path d="M16.5263 13.5H11.4737C11.2147 13.5 11 13.16 11 12.75C11 12.34 11.2147 12 11.4737 12H16.5263C16.7853 12 17 12.34 17 12.75C17 13.16 16.7853 13.5 16.5263 13.5Z" fill={props.color} />
      <path d="M11.75 13C11.34 13 11 12.7495 11 12.4474V6.55263C11 6.25053 11.34 6 11.75 6C12.16 6 12.5 6.25053 12.5 6.55263V12.4474C12.5 12.7495 12.16 13 11.75 13Z" fill={props.color} />
    </svg>
  )
}

ClockInputSvg.defaultProps = {
  color: 'white'
}

export default ClockInputSvg
