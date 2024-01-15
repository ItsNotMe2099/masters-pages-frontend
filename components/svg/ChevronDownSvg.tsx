import React from 'react'

interface Props {
  className?: string
  color?: string
}

function ChevronDownSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.975 13.25L7.02501 8.30005L5.95001 9.37505L11.975 15.4L18 9.37505L16.925 8.30005L11.975 13.25Z" fill={props.color} />
    </svg>
  )
}
ChevronDownSvg.defaultProps = {
}

export default ChevronDownSvg
