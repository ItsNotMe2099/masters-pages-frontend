import React from 'react'

interface Props {
  className?: string
  color?: string
}

function ChevronMoreSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13.25 11.975L8.30005 7.02501L9.37505 5.95001L15.4 11.975L9.37505 18L8.30005 16.925L13.25 11.975Z" fill={props.color} />
    </svg>
  )
}
ChevronMoreSvg.defaultProps = {
}

export default ChevronMoreSvg
