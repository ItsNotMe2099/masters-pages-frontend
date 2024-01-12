import React from 'react'

interface Props {
  className?: string
}

function ArrowDownSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="16" height="21" viewBox="0 0 16 21" fill="none">
      <path d="M7.29289 20.3272C7.68342 20.7177 8.31658 20.7177 8.70711 20.3272L15.0711 13.9633C15.4616 13.5727 15.4616 12.9396 15.0711 12.549C14.6805 12.1585 14.0474 12.1585 13.6569 12.549L8 18.2059L2.34315 12.549C1.95262 12.1585 1.31946 12.1585 0.928932 12.549C0.538407 12.9396 0.538407 13.5727 0.928932 13.9633L7.29289 20.3272ZM7 0.620117L7 19.6201L9 19.6201L9 0.620117L7 0.620117Z" fill="#6D718C" />
    </svg>
  )
}
ArrowDownSvg.defaultProps = {
}

export default ArrowDownSvg
