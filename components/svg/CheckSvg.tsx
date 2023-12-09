import React from 'react'

interface Props {
  className?: string
}

function CheckSvg(props: Props) {
  return (
    <svg className={props.className} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 16.05L6.67505 12.225L7.72505 11.175L10.5 13.95L17.275 7.17499L18.325 8.22499L10.5 16.05Z" fill="white" />
    </svg>
  )
}
CheckSvg.defaultProps = {
}

export default CheckSvg
