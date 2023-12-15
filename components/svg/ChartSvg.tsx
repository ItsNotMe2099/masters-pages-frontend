import React from 'react'

interface Props {
  className?: string
  color: string
}

function ChartSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M10.65 25.6125H12.9V15.3H10.65V25.6125ZM16.875 25.6125H19.125V10.3875H16.875V25.6125ZM23.1 25.6125H25.35V20.0625H23.1V25.6125ZM6.75 31.5C6.15 31.5 5.625 31.275 5.175 30.825C4.725 30.375 4.5 29.85 4.5 29.25V6.75C4.5 6.15 4.725 5.625 5.175 5.175C5.625 4.725 6.15 4.5 6.75 4.5H29.25C29.85 4.5 30.375 4.725 30.825 5.175C31.275 5.625 31.5 6.15 31.5 6.75V29.25C31.5 29.85 31.275 30.375 30.825 30.825C30.375 31.275 29.85 31.5 29.25 31.5H6.75ZM6.75 29.25H29.25V6.75H6.75V29.25Z" fill={props.color} />
    </svg>
  )
}
ChartSvg.defaultProps = {
}

export default ChartSvg
